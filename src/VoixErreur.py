import time
from nava import play, stop

sound_id = play("Voix/Voix_ManqueChamps.wav", async_mode=True)
time.sleep(3)
stop(sound_id)
