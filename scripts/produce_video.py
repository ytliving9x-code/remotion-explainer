import argparse
import asyncio
import json
import os
import subprocess
import sys
import edge_tts

if sys.stdout:
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

PROJECT_ROOT = r"D:\remotion-explainer"
TOPICS_DIR = os.path.join(PROJECT_ROOT, "topics")
PUBLIC_DIR = os.path.join(PROJECT_ROOT, "public")
OUT_DIR = os.path.join(PROJECT_ROOT, "out")

async def generate_voice_for_topic(topic_config):
    topic_id = topic_config.get("id", "sample")
    audio_rel = topic_config.get("audioFolder", f"audio/{topic_id}")
    audio_dir = os.path.join(PUBLIC_DIR, audio_rel.replace("/", os.sep))
    os.makedirs(audio_dir, exist_ok=True)

    voice_name = "vi-VN-NamMinhNeural"
    tasks = []

    # Voice 0: Intro (3s)
    intro_text = f"{topic_config.get('title', '')} trong ba mươi giây?"
    tasks.append(("voice_0.mp3", intro_text))

    # Voice 1..N: Segments
    for seg in topic_config.get("segments", []):
        step_num = seg.get("step", 1)
        text = seg.get("voiceText", "")
        tasks.append((f"voice_{step_num}.mp3", text))

    # Voice 5: Outro
    outro_text = topic_config.get("outro", {}).get(
        "voiceText",
        "Xong trong ba mươi giây! Bạn muốn giải thích cỗ máy nào tiếp theo, hãy bình luận nhé!"
    )
    tasks.append(("voice_5.mp3", outro_text))

    print(f"\n[TTS] Generating voiceovers for '{topic_id}' in {audio_dir}...")
    for filename, text in tasks:
        filepath = os.path.join(audio_dir, filename)
        if os.path.exists(filepath) and os.path.getsize(filepath) > 5000:
            print(f"  [OK] Exists: {filename}")
            continue

        for attempt in range(3):
            try:
                await asyncio.sleep(1.0)
                communicate = edge_tts.Communicate(text, voice_name)
                await communicate.save(filepath)
                print(f"  [+] Created: {filename} ({os.path.getsize(filepath)} bytes)")
                break
            except Exception as e:
                print(f"  [!] Retry {attempt+1} for {filename}: {e}")
                await asyncio.sleep(2.0)

def render_video_remotion(json_filepath, topic_config, port=3005):
    topic_id = topic_config.get("id", "output")
    os.makedirs(OUT_DIR, exist_ok=True)
    out_mp4 = os.path.join(OUT_DIR, f"{topic_id}.mp4")

    # Command: npx remotion render UniversalExplainerTikTok out/<id>.mp4 --props="<path>" --port=3005
    cmd = [
        "npx.cmd",
        "remotion",
        "render",
        "UniversalExplainerTikTok",
        out_mp4,
        f"--props={json_filepath}",
        f"--port={port}",
    ]

    print(f"\n[RENDER] Rendering MP4: {out_mp4}...")
    print(f"  Command: {' '.join(cmd)}")
    result = subprocess.run(cmd, cwd=PROJECT_ROOT)
    if result.returncode == 0:
        print(f"  [SUCCESS] Rendered successfully: {out_mp4}")
    else:
        print(f"  [ERROR] Render failed with exit code {result.returncode}")

async def process_topic_file(json_filepath, do_render=False, port=3005):
    with open(json_filepath, "r", encoding="utf-8") as f:
        topic_config = json.load(f)

    await generate_voice_for_topic(topic_config)

    if do_render:
        render_video_remotion(json_filepath, topic_config, port=port)

def main():
    parser = argparse.ArgumentParser(description="Produce TikTok Explainer videos in batch")
    parser.add_argument("--topic", type=str, help="Topic JSON filename or path")
    parser.add_argument("--batch", action="store_true", help="Process all topics in topics/ folder")
    parser.add_argument("--render", action="store_true", help="Render MP4 video with Remotion CLI")
    parser.add_argument("--port", type=int, default=3005, help="Port to use for Remotion renderer")
    args = parser.parse_args()

    if args.batch:
        files = [
            os.path.join(TOPICS_DIR, f)
            for f in os.listdir(TOPICS_DIR)
            if f.endswith(".json")
        ]
        print(f"Found {len(files)} topic(s) to process in batch mode.")
        for f in files:
            asyncio.run(process_topic_file(f, do_render=args.render, port=args.port))
    elif args.topic:
        path = args.topic
        if not os.path.exists(path):
            path = os.path.join(TOPICS_DIR, args.topic if args.topic.endswith(".json") else f"{args.topic}.json")
        if not os.path.exists(path):
            print(f"Topic file not found: {path}")
            sys.exit(1)
        asyncio.run(process_topic_file(path, do_render=args.render, port=args.port))
    else:
        print("Please provide --topic <name> or --batch flag. Example: python scripts/produce_video.py --topic dong-co-phan-luc")

if __name__ == "__main__":
    main()
