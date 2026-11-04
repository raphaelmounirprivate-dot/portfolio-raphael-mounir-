"""Export the original public game at an immutable revision; no gameplay patches."""
from pathlib import Path
import hashlib
import os
import shutil
import subprocess
import urllib.request
import zipfile
import sys

ROOT = Path(__file__).resolve().parent.parent
CACHE = ROOT / '.local/pandemic-web'
SOURCE = CACHE / 'source'
REVISION = 'b066ed745c7c778b45f1fbe0baa3df8e372be2b0'
VERSION = '4.7.2-stable'
BASE = f'https://github.com/godotengine/godot-builds/releases/download/{VERSION}'
CACHE.mkdir(parents=True, exist_ok=True)

def run(*args, **kwargs):
    return subprocess.run([str(a) for a in args], check=True, **kwargs)

if not SOURCE.exists():
    run('git', 'clone', '--no-checkout', 'https://github.com/raphaelmounirprivate-dot/pandemic-horizon.git', SOURCE)
    run('git', '-C', SOURCE, 'checkout', '--detach', REVISION)
actual = subprocess.check_output(['git', '-C', str(SOURCE), 'rev-parse', 'HEAD'], text=True).strip()
if actual != REVISION:
    raise RuntimeError(f'Unexpected source revision: {actual}')
changed = subprocess.check_output(['git', '-C', str(SOURCE), 'diff', '--name-only', 'HEAD'], text=True).splitlines()
if any(path != 'export_presets.cfg' for path in changed):
    raise RuntimeError(f'Game source modified: {changed}')
engine = os.environ.get('GODOT_BIN')
templates = os.environ.get('GODOT_TEMPLATES_DIR')
if not engine or not templates:
    if os.name == 'nt':
        raise RuntimeError('Set GODOT_BIN and GODOT_TEMPLATES_DIR to Godot 4.7.2 and its Web templates on Windows.')
    sums = urllib.request.urlopen(f'{BASE}/SHA512-SUMS.txt').read().decode()
    def download(name):
        target = CACHE / name
        expected = next(line.split()[0] for line in sums.splitlines() if line.split()[-1].lstrip('*') == name)
        if not target.exists() or hashlib.file_digest(target.open('rb'), 'sha512').hexdigest() != expected:
            urllib.request.urlretrieve(f'{BASE}/{name}', target)
        with target.open('rb') as content:
            if hashlib.file_digest(content, 'sha512').hexdigest() != expected:
                raise RuntimeError(f'SHA512 mismatch: {name}')
        return target
    editor = download(f'Godot_v{VERSION}_linux.x86_64.zip')
    engine_dir = CACHE / 'engine'
    with zipfile.ZipFile(editor) as archive:
        archive.extractall(engine_dir)
    engine = engine_dir / f'Godot_v{VERSION}_linux.x86_64'
    engine.chmod(0o755)
    templates = CACHE / 'templates'
    templates.mkdir(exist_ok=True)
    with zipfile.ZipFile(download(f'Godot_v{VERSION}_export_templates.tpz')) as archive:
        for name in ['web_nothreads_release.zip', 'web_nothreads_debug.zip']:
            (templates / name).write_bytes(archive.read(f'templates/{name}'))
templates = Path(templates).resolve()
engine = str(Path(engine).resolve())
version = subprocess.check_output([engine, '--version'], text=True).strip()
if not version.startswith('4.7.2.stable.'):
    raise RuntimeError(f'Wrong Godot version: {version}')
env = os.environ.copy()
for key in ['APPDATA', 'LOCALAPPDATA', 'XDG_DATA_HOME', 'XDG_CONFIG_HOME']:
    env[key] = str(CACHE / 'isolated-user')
Path(env['APPDATA']).mkdir(exist_ok=True)
preset = (ROOT / 'scripts/horizon-web.cfg').read_text(encoding='utf-8-sig')
for mode in ['debug', 'release']:
    preset = preset.replace(f'custom_template/{mode}=""', f'custom_template/{mode}="{(templates / ("web_nothreads_" + mode + ".zip")).as_posix()}"')
(SOURCE / 'export_presets.cfg').write_text(preset, encoding='utf-8')
run(engine, '--headless', '--editor', '--path', SOURCE, '--import', env=env)
if '--test' in sys.argv:
    run(engine, '--headless', '--path', SOURCE, '--script', 'res://tests/run_tests.gd', '--', '--no-autosave', env=env)
output = ROOT / 'public/horizon-game'
output.mkdir(parents=True, exist_ok=True)
run(engine, '--headless', '--path', SOURCE, '--export-release', 'Web', output / 'index.html', env=env)
licenses = output / 'licenses'
licenses.mkdir(exist_ok=True)
for name in ['Godot-LICENSE.txt', 'Godot-COPYRIGHT.txt']:
    shutil.copyfile(SOURCE / 'docs/licences' / name, licenses / name)
(output / 'source.json').write_text(__import__('json').dumps({'repository': 'https://github.com/raphaelmounirprivate-dot/pandemic-horizon', 'revision': REVISION, 'version': '0.26.0', 'engine': version}), encoding='utf-8')
print(f'Exported original Pandemic Horizon {REVISION} to {output}')
