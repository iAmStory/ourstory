document.addEventListener('DOMContentLoaded', () => {
  const STORY_PAGES = [
    "🌸 To Anamika – meri baatuni doctor, jise paranthe aur perfection dono pasand hai! 🌸",
    "Yeh kahani hai uss ladki ki jo message se zyada call prefer karti hai...",
    "...chai banane mein expert hai, aur kisi bhi report se pehle bacteria pakad leti hai. 🤓",
    "Dehradun mein rehti hai, lekin dil aur roots Firozabad se jude hain.",
    "PhD, hospital duty, ghar ka pyaar, aur apne sapne... sab kuch calmness se sambhal leti ho.",
    "Uski vibes? Ekdum cozy but confident.",
    "Aesthetic ka strong sense rakhti ho, aur thoda sa possessive bhi... jab tum care karti ho.",
    "Tumhara signature combo: Aloo parantha, hari chutney aur raita. Bilkul tumhari tarah: simple, tasty, aur full of warmth.",
    "Music ka taste awesome hai, aur colors ki toh encyclopedia ho (beige, mocha, camel... sab yaad hai mujhe 😂).",
    "Astrology, kitchen experiments, ya bas hamari baatein... tumse baat karna feels like ghar ki balcony wali shaam. I love you. ☕❤️"
  ];

  const BACKGROUND_COLORS = [
    'from-rose-100 to-teal-100',
    'from-purple-100 to-indigo-200',
    'from-yellow-100 to-rose-100',
    'from-green-100 to-cyan-100',
    'from-pink-100 to-violet-200',
    'from-sky-100 to-fuchsia-200',
    'from-orange-100 to-amber-200',
    'from-lime-100 to-emerald-200',
    'from-red-100 to-rose-200',
    'from-indigo-200 to-purple-300',
    'from-fuchsia-300 to-pink-300',
  ];

  let currentIndex = 0;

  const backgroundGradient = document.getElementById('background-gradient');
  const storyScreen = document.getElementById('story-screen');
  const storyText = document.getElementById('story-text');
  const endScreen = document.getElementById('end-screen');
  const restartButton = document.getElementById('restart-button');
  const playPauseButton = document.getElementById('play-pause-button');
  const playIcon = document.getElementById('play-icon');
  const pauseIcon = document.getElementById('pause-icon');
  const playPauseText = document.getElementById('play-pause-text');
  var audioPlayer = new Audio('song.mp3');
  const musicIndicator = document.getElementById('music-indicator');
  
  const updateScreen = () => {
    if (!backgroundGradient || !storyScreen || !storyText || !endScreen) return;

    // Remove all previous background classes
    backgroundGradient.className = 'absolute inset-0 transition-opacity duration-1000 bg-gradient-to-br';
    const backgroundClass = BACKGROUND_COLORS[currentIndex % BACKGROUND_COLORS.length];
    backgroundGradient.classList.add(...backgroundClass.split(' '));

    if (currentIndex < STORY_PAGES.length) {
      storyScreen.classList.remove('hidden');
      storyScreen.classList.remove('animate-fade-in');
      void storyScreen.offsetWidth; // Trigger reflow to restart animation
      storyScreen.classList.add('animate-fade-in');
      
      endScreen.classList.add('hidden');
      endScreen.classList.remove('flex');

      storyText.textContent = STORY_PAGES[currentIndex];
    } else {
      storyScreen.classList.add('hidden');
      
      endScreen.classList.remove('hidden');
      endScreen.classList.add('flex');
      endScreen.classList.remove('animate-fade-in');
      void endScreen.offsetWidth; // Trigger reflow
      endScreen.classList.add('animate-fade-in');
    }
  };

  const handleNext = () => {
    if (currentIndex < STORY_PAGES.length) {
      currentIndex++;
      updateScreen();
    }
    if (currentIndex === STORY_PAGES.length - 3) {
      // If we're reaching  the end, play the audio
      if (audioPlayer) {
        audioPlayer.play().catch(error => {
          console.error("Audio playback failed:", error);
        });
      }
    }
  };

  const handleRestart = () => {
    currentIndex = 0;
    if (audioPlayer && !audioPlayer.paused) {
        audioPlayer.pause();
    }
    if (audioPlayer) {
      audioPlayer.currentTime = 0;
    }
    updateScreen();
  };
  
  const updatePlayButtonUI = (isPlaying) => {
    if (!playIcon || !pauseIcon || !playPauseText || !musicIndicator || !playPauseButton) return;

    if (isPlaying) {
        playIcon.classList.add('hidden');
        pauseIcon.classList.remove('hidden');
        playPauseText.textContent = 'Pause Our Song';
        musicIndicator.classList.remove('hidden');
        playPauseButton.setAttribute('aria-label', 'Pause song');
    } else {
        playIcon.classList.remove('hidden');
        pauseIcon.classList.add('hidden');
        playPauseText.textContent = 'Play Our Song';
        musicIndicator.classList.add('hidden');
        playPauseButton.setAttribute('aria-label', 'Play song');
    }
  };

  const handlePlayPause = () => {
    if (!audioPlayer) return;

    if (audioPlayer.paused) {
      audioPlayer.play().catch(error => {
        console.error("Audio playback failed:", error);
      });
    } else {
      audioPlayer.pause();
    }
  };

  if (storyScreen) {
    storyScreen.addEventListener('click', handleNext);
    // add keyboard navigation
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault(); // Prevent default action for Enter/Space
        handleNext();
      }
    });
  }
  if (restartButton) restartButton.addEventListener('click', handleRestart);
  if (playPauseButton) playPauseButton.addEventListener('click', handlePlayPause);
  if (audioPlayer) {
    audioPlayer.addEventListener('play', () => updatePlayButtonUI(true));
    audioPlayer.addEventListener('pause', () => updatePlayButtonUI(false));
  }

  // Initial setup
  updateScreen();
});
