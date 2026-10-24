import asyncio
import os
import sys
import math
import struct
import wave
import edge_tts

if sys.stdout:
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

OUTPUT_DIR = r"D:\remotion-explainer\public\audio"
os.makedirs(OUTPUT_DIR, exist_ok=True)

VOICE_SEGMENTS = [
    ("voice_0.mp3", "Súng lục bắn như thế nào trong ba mươi giây?"),
    ("voice_1.mp3", "Bước một: Khi bóp cò, kim hỏa lao tới đập mạnh vào hạt nổ ở đuôi viên đạn."),
    ("voice_2.mp3", "Bước hai: Thuốc súng bốc cháy tạo áp lực cực lớn, đẩy đầu đạn xoáy theo rãnh nòng phóng đi."),
    ("voice_3.mp3", "Bước ba: Theo định luật Newton, phản lực giật nắp trượt về sau và hất vỏ đạn rỗng bay ra ngoài."),
    ("voice_4.mp3", "Bước bốn: Lò xo hồi vị đẩy nắp trượt trở lại, nạp ngay viên đạn mới vào buồng đạn trong không phẩy không năm giây."),
    ("voice_5.mp3", "Xong trong ba mươi giây! Bạn muốn giải thích cỗ máy nào tiếp theo, hãy bình luận ngay nhé!"),
]

async def generate_voiceovers():
    print("Generating voiceovers with edge-tts...")
    voice = "vi-VN-NamMinhNeural"
    for filename, text in VOICE_SEGMENTS:
        filepath = os.path.join(OUTPUT_DIR, filename)
        if os.path.exists(filepath) and os.path.getsize(filepath) > 5000:
            print(f"  Already exists {filename} ({os.path.getsize(filepath)} bytes)")
            continue
        for attempt in range(4):
            try:
                await asyncio.sleep(1.2)
                communicate = edge_tts.Communicate(text, voice)
                await communicate.save(filepath)
                size = os.path.getsize(filepath)
                print(f"  Generated {filename} ({size} bytes): '{text}'")
                break
            except Exception as e:
                print(f"  Retry {attempt+1} for {filename} due to: {e}")
                await asyncio.sleep(2)

def generate_sfx():
    print("Generating procedural SFX audio files...")
    sample_rate = 44100

    def write_wav(filename, samples):
        filepath = os.path.join(OUTPUT_DIR, filename)
        with wave.open(filepath, 'w') as wav:
            wav.setnchannels(1)        # mono
            wav.setsampwidth(2)        # 16-bit
            wav.setframerate(sample_rate)
            # Clip and convert to 16-bit signed integer
            raw_data = bytearray()
            for s in samples:
                val = max(-32767, min(32767, int(s * 32767)))
                raw_data.extend(struct.pack('<h', val))
            wav.writeframes(raw_data)
        print(f"  Generated {filename} ({os.path.getsize(filepath)} bytes)")

    # 1. Trigger Click (sharp metallic snap, 120ms)
    duration = 0.12
    n_samples = int(sample_rate * duration)
    samples = []
    for i in range(n_samples):
        t = i / sample_rate
        env = math.exp(-t * 60)
        # Fast snap at 1800Hz and 3200Hz
        val = 0.7 * math.sin(2 * math.pi * 1800 * t) + 0.3 * math.sin(2 * math.pi * 3200 * t)
        samples.append(val * env)
    write_wav("sfx_click.wav", samples)

    # 2. Gunshot Blast (Boom + sub bass + noise, 450ms)
    duration = 0.45
    n_samples = int(sample_rate * duration)
    import random
    samples = []
    for i in range(n_samples):
        t = i / sample_rate
        # Fast punch transient + booming low end
        env_transient = math.exp(-t * 40)
        env_sub = math.exp(-t * 12)
        noise = (random.random() * 2 - 1) * env_transient
        sub = math.sin(2 * math.pi * (80 - t * 70) * t) * env_sub
        val = 0.6 * noise + 0.5 * sub
        samples.append(val)
    write_wav("sfx_blast.wav", samples)

    # 3. Slide Recoil (Metallic slide clack, 250ms)
    duration = 0.25
    n_samples = int(sample_rate * duration)
    samples = []
    for i in range(n_samples):
        t = i / sample_rate
        env1 = math.exp(-abs(t - 0.03) * 50)
        env2 = math.exp(-abs(t - 0.12) * 45)
        m1 = math.sin(2 * math.pi * 950 * t) * env1
        m2 = math.sin(2 * math.pi * 1400 * t) * env2
        samples.append(0.5 * (m1 + m2))
    write_wav("sfx_slide.wav", samples)

    # 4. Casing Ejection Ping (Brass chime, 350ms)
    duration = 0.35
    n_samples = int(sample_rate * duration)
    samples = []
    for i in range(n_samples):
        t = i / sample_rate
        env = math.exp(-t * 15)
        # Metallic bell frequencies (2450Hz and 4900Hz)
        val = 0.6 * math.sin(2 * math.pi * 2450 * t) + 0.3 * math.sin(2 * math.pi * 4900 * t)
        samples.append(val * env)
    write_wav("sfx_eject.wav", samples)

    # 5. Chamber Lock (Mechanical solid snap, 180ms)
    duration = 0.18
    n_samples = int(sample_rate * duration)
    samples = []
    for i in range(n_samples):
        t = i / sample_rate
        env = math.exp(-t * 35)
        val = 0.5 * math.sin(2 * math.pi * 620 * t) + 0.4 * math.sin(2 * math.pi * 1250 * t)
        samples.append(val * env)
    write_wav("sfx_chamber.wav", samples)

    # 6. Tension BGM Synth Drone Loop (10 seconds, looped across 30s)
    duration = 10.0
    n_samples = int(sample_rate * duration)
    samples = []
    bpm = 120
    beat_sec = 60 / bpm  # 0.5s
    for i in range(n_samples):
        t = i / sample_rate
        # Sub bass drone at 55Hz (A1)
        sub_drone = 0.25 * math.sin(2 * math.pi * 55 * t)
        # Pulsing rhythmic beat every 0.5s
        beat_phase = (t % beat_sec) / beat_sec
        beat_env = math.exp(-beat_phase * 15)
        kick = 0.35 * math.sin(2 * math.pi * 75 * beat_phase) * beat_env
        # Hi-hat tick
        tick = (random.random() * 2 - 1) * math.exp(-((t % 0.25) / 0.25) * 40) * 0.08
        # Synth pulse
        synth = 0.12 * math.sin(2 * math.pi * 220 * t) * (0.5 + 0.5 * math.sin(2 * math.pi * 0.5 * t))
        samples.append(sub_drone + kick + tick + synth)
    write_wav("bgm_tension.wav", samples)

if __name__ == "__main__":
    asyncio.run(generate_voiceovers())
    generate_sfx()
    print("All audio assets generated successfully!")
