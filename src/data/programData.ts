import { ModuleData } from '../types.ts';

export const PROGRAM_MODULES: ModuleData[] = [
  {
    id: 1,
    weekNumber: 1,
    title: 'Savoring & Gratitude',
    subtitle: 'Module 1 · Week 1',
    shortDescription:
      'Cultivate positive emotional awareness by slowing down to savor everyday moments and intentionally appreciating life’s gifts.',
    focusAreas: ['Savoring', 'Gratitude'],
    scienceSummary:
      'Research shows that savoring intensifies and prolongs positive experiences, while daily gratitude rewires attention away from hedonic adaptation.',
    accentColor: 'teal',
    days: [
      {
        dayNumber: 1,
        overallDay: 1,
        title: 'Day 1',
        activities: [
          {
            id: 'm1-d1-a1',
            moduleId: 1,
            dayNumber: 1,
            overallDay: 1,
            category: 'Savoring',
            name: 'Mindful Drink',
            instructions:
              'Take 5 minutes to slowly sip your morning tea or coffee, focusing entirely on the aroma, warmth, and flavor.',
            estimatedMinutes: 5,
          },
          {
            id: 'm1-d1-a2',
            moduleId: 1,
            dayNumber: 1,
            overallDay: 1,
            category: 'Gratitude',
            name: '3 Things',
            instructions:
              'Write down 3 specific things you are grateful for today and explain why they matter to you.',
            estimatedMinutes: 5,
          },
        ],
      },
      {
        dayNumber: 2,
        overallDay: 2,
        title: 'Day 2',
        activities: [
          {
            id: 'm1-d2-a1',
            moduleId: 1,
            dayNumber: 2,
            overallDay: 2,
            category: 'Savoring',
            name: 'Nature Sound',
            instructions:
              'Step outside or open a window for 5 minutes to listen intentionally to natural sounds—birds, wind, rustling leaves—without distraction.',
            estimatedMinutes: 5,
          },
          {
            id: 'm1-d2-a2',
            moduleId: 1,
            dayNumber: 2,
            overallDay: 2,
            category: 'Gratitude',
            name: 'Micro-Gratitude',
            instructions:
              'Notice and mentally appreciate 3 small, mundane conveniences or moments throughout the day that you typically take for granted.',
            estimatedMinutes: 5,
          },
        ],
      },
      {
        dayNumber: 3,
        overallDay: 3,
        title: 'Day 3',
        activities: [
          {
            id: 'm1-d3-a1',
            moduleId: 1,
            dayNumber: 3,
            overallDay: 3,
            category: 'Savoring',
            name: 'Memory Replay',
            instructions:
              'Spend 5-10 minutes vividly recalling a happy, joyful memory from your past, reliving the sights, emotions, and sensations.',
            estimatedMinutes: 10,
          },
          {
            id: 'm1-d3-a2',
            moduleId: 1,
            dayNumber: 3,
            overallDay: 3,
            category: 'Gratitude',
            name: 'Body Gratitude',
            instructions:
              'Take time to appreciate 3 things your physical body did for you today (e.g., walking, breathing effortlessly, supporting you).',
            estimatedMinutes: 5,
          },
        ],
      },
      {
        dayNumber: 4,
        overallDay: 4,
        title: 'Day 4',
        activities: [
          {
            id: 'm1-d4-a1',
            moduleId: 1,
            dayNumber: 4,
            overallDay: 4,
            category: 'Savoring',
            name: 'Meal Immersion',
            instructions:
              'Eat one meal or snack completely unplugged—no screens, podcasts, or work—savoring each bite, texture, and taste.',
            estimatedMinutes: 15,
          },
          {
            id: 'm1-d4-a2',
            moduleId: 1,
            dayNumber: 4,
            overallDay: 4,
            category: 'Gratitude',
            name: 'Gratitude Note',
            instructions:
              'Write a brief note, text message, or email expressing genuine thanks to someone who has positively impacted your week.',
            estimatedMinutes: 5,
          },
        ],
      },
      {
        dayNumber: 5,
        overallDay: 5,
        title: 'Day 5',
        activities: [
          {
            id: 'm1-d5-a1',
            moduleId: 1,
            dayNumber: 5,
            overallDay: 5,
            category: 'Savoring',
            name: 'Music Focus',
            instructions:
              'Listen to a favorite piece of music or soothing melody with eyes closed, giving it 100% of your undivided attention.',
            estimatedMinutes: 5,
          },
          {
            id: 'm1-d5-a2',
            moduleId: 1,
            dayNumber: 5,
            overallDay: 5,
            category: 'Gratitude',
            name: 'Past Gratitude',
            instructions:
              'Reflect on a past challenge, obstacle, or failure and identify at least one positive lesson, strength, or outcome you gained from it.',
            estimatedMinutes: 10,
          },
        ],
      },
      {
        dayNumber: 6,
        overallDay: 6,
        title: 'Day 6',
        activities: [
          {
            id: 'm1-d6-a1',
            moduleId: 1,
            dayNumber: 6,
            overallDay: 6,
            category: 'Savoring',
            name: 'Shower Savoring',
            instructions:
              'Turn your daily shower or wash into a mindful sensory experience, noticing the warmth of the water, steam, and scents.',
            estimatedMinutes: 10,
          },
          {
            id: 'm1-d6-a2',
            moduleId: 1,
            dayNumber: 6,
            overallDay: 6,
            category: 'Gratitude',
            name: 'Simple Pleasures',
            instructions:
              'Identify and write down 3 simple sensory pleasures in your immediate environment right now that bring comfort.',
            estimatedMinutes: 5,
          },
        ],
      },
      {
        dayNumber: 7,
        overallDay: 7,
        title: 'Day 7',
        activities: [
          {
            id: 'm1-d7-a1',
            moduleId: 1,
            dayNumber: 7,
            overallDay: 7,
            category: 'Savoring',
            name: 'Sky Observation',
            instructions:
              'Spend 5-10 minutes looking at the sky, clouds, sunrise, or stars, immersing yourself in awe and perspective.',
            estimatedMinutes: 10,
          },
          {
            id: 'm1-d7-a2',
            moduleId: 1,
            dayNumber: 7,
            overallDay: 7,
            category: 'Gratitude',
            name: 'Weekly Reflection',
            instructions:
              'Review your gratitude list from the past week, noticing how practicing intentional thankfulness shaped your mood.',
            estimatedMinutes: 10,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    weekNumber: 2,
    title: 'Kindness & Social Connections',
    subtitle: 'Module 2 · Week 2',
    shortDescription:
      'Boost social bonding and mood through deliberate acts of prosocial kindness and deepening interpersonal relationships.',
    focusAreas: ['Kindness', 'Social Connection'],
    scienceSummary:
      'Helping others and prioritizing face-to-face or voice connections triggers oxytocin and dopamine release, directly elevating life satisfaction.',
    accentColor: 'rose',
    days: [
      {
        dayNumber: 1,
        overallDay: 8,
        title: 'Day 1',
        activities: [
          {
            id: 'm2-d1-a1',
            moduleId: 2,
            dayNumber: 1,
            overallDay: 8,
            category: 'Kindness',
            name: 'Genuine Compliment',
            instructions:
              'Give a sincere, thoughtful compliment to someone today about their effort, character, or positive impact.',
            estimatedMinutes: 5,
          },
          {
            id: 'm2-d1-a2',
            moduleId: 2,
            dayNumber: 1,
            overallDay: 8,
            category: 'Social Connection',
            name: 'Reach Out',
            instructions:
              'Send a warm message or call a friend or family member you haven’t spoken with recently just to say hello.',
            estimatedMinutes: 10,
          },
        ],
      },
      {
        dayNumber: 2,
        overallDay: 9,
        title: 'Day 2',
        activities: [
          {
            id: 'm2-d2-a1',
            moduleId: 2,
            dayNumber: 2,
            overallDay: 9,
            category: 'Kindness',
            name: 'Courtesy Act',
            instructions:
              'Perform a deliberate act of courtesy—hold an elevator, let someone merge in traffic, or open a door with a warm smile.',
            estimatedMinutes: 5,
          },
          {
            id: 'm2-d2-a2',
            moduleId: 2,
            dayNumber: 2,
            overallDay: 9,
            category: 'Social Connection',
            name: 'Distraction-Free Chat',
            instructions:
              'Have a 10-minute conversation with a friend, coworker, or loved one with your phone put completely away.',
            estimatedMinutes: 10,
          },
        ],
      },
      {
        dayNumber: 3,
        overallDay: 10,
        title: 'Day 3',
        activities: [
          {
            id: 'm2-d3-a1',
            moduleId: 2,
            dayNumber: 3,
            overallDay: 10,
            category: 'Kindness',
            name: 'Small Favor',
            instructions:
              'Do a helpful small favor for someone without them having to ask, such as making coffee, tidying a shared space, or carrying an item.',
            estimatedMinutes: 10,
          },
          {
            id: 'm2-d3-a2',
            moduleId: 2,
            dayNumber: 3,
            overallDay: 10,
            category: 'Social Connection',
            name: 'Stranger Interaction',
            instructions:
              'Share a friendly, warm micro-interaction with a stranger—a cashier, barista, neighbor—wishing them a good day.',
            estimatedMinutes: 5,
          },
        ],
      },
      {
        dayNumber: 4,
        overallDay: 11,
        title: 'Day 4',
        activities: [
          {
            id: 'm2-d4-a1',
            moduleId: 2,
            dayNumber: 4,
            overallDay: 11,
            category: 'Kindness',
            name: 'Supportive Message',
            instructions:
              'Send a message of encouragement, appreciation, or celebration to someone who is working hard or going through a tough time.',
            estimatedMinutes: 5,
          },
          {
            id: 'm2-d4-a2',
            moduleId: 2,
            dayNumber: 4,
            overallDay: 11,
            category: 'Social Connection',
            name: 'Shared Meal',
            instructions:
              'Enjoy a meal or coffee break with a friend, family member, or colleague, focusing on genuine presence and connection.',
            estimatedMinutes: 30,
          },
        ],
      },
      {
        dayNumber: 5,
        overallDay: 12,
        title: 'Day 5',
        activities: [
          {
            id: 'm2-d5-a1',
            moduleId: 2,
            dayNumber: 5,
            overallDay: 12,
            category: 'Kindness',
            name: 'Digital Kindness',
            instructions:
              'Leave a positive, encouraging comment, glowing review for a small business, or thoughtful note online.',
            estimatedMinutes: 5,
          },
          {
            id: 'm2-d5-a2',
            moduleId: 2,
            dayNumber: 5,
            overallDay: 12,
            category: 'Social Connection',
            name: 'Deep Check-in',
            instructions:
              'Ask someone in your life "How are you really doing lately?" and listen attentively without rushing to give advice.',
            estimatedMinutes: 15,
          },
        ],
      },
      {
        dayNumber: 6,
        overallDay: 13,
        title: 'Day 6',
        activities: [
          {
            id: 'm2-d6-a1',
            moduleId: 2,
            dayNumber: 6,
            overallDay: 13,
            category: 'Kindness',
            name: 'Anonymous Deed',
            instructions:
              'Do something kind anonymously, such as leaving an uplifting sticky note, paying for someone\'s drink, or cleaning up litter.',
            estimatedMinutes: 10,
          },
          {
            id: 'm2-d6-a2',
            moduleId: 2,
            dayNumber: 6,
            overallDay: 13,
            category: 'Social Connection',
            name: 'Voice Call',
            instructions:
              'Make a 10-15 minute voice or video phone call instead of texting to genuinely hear someone\'s voice and laugh together.',
            estimatedMinutes: 15,
          },
        ],
      },
      {
        dayNumber: 7,
        overallDay: 14,
        title: 'Day 7',
        activities: [
          {
            id: 'm2-d7-a1',
            moduleId: 2,
            dayNumber: 7,
            overallDay: 14,
            category: 'Kindness',
            name: 'Self-Kindness',
            instructions:
              'Treat yourself with the same compassion and forgiveness you would offer a best friend; engage in a restorative break without guilt.',
            estimatedMinutes: 15,
          },
          {
            id: 'm2-d7-a2',
            moduleId: 2,
            dayNumber: 7,
            overallDay: 14,
            category: 'Social Connection',
            name: 'Group Connection',
            instructions:
              'Participate in a shared group activity, community circle, team gathering, or club where you connect with like-minded people.',
            estimatedMinutes: 30,
          },
        ],
      },
    ],
  },
  {
    id: 3,
    weekNumber: 3,
    title: 'Exercise & Sleep',
    subtitle: 'Module 3 · Week 3',
    shortDescription:
      'Optimize the physiological bedrock of well-being through daily intentional physical movement and restorative sleep hygiene.',
    focusAreas: ['Exercise', 'Sleep Hygiene'],
    scienceSummary:
      'Regular exercise rivals antidepressants in clinical trials for mood elevation, while 7+ hours of quality sleep restores neuroplasticity and emotional resilience.',
    accentColor: 'amber',
    days: [
      {
        dayNumber: 1,
        overallDay: 15,
        title: 'Day 1',
        activities: [
          {
            id: 'm3-d1-a1',
            moduleId: 3,
            dayNumber: 1,
            overallDay: 15,
            category: 'Exercise',
            name: '20-Minute Walk',
            instructions:
              'Take a brisk 20-minute outdoor or indoor walk to elevate your heart rate, clear your mind, and stimulate circulation.',
            estimatedMinutes: 20,
          },
          {
            id: 'm3-d1-a2',
            moduleId: 3,
            dayNumber: 1,
            overallDay: 15,
            category: 'Sleep Hygiene',
            name: 'Digital Detox',
            instructions:
              'Turn off all screens—smartphones, tablets, TV, computers—at least 30-60 minutes before getting into bed.',
            estimatedMinutes: 45,
          },
        ],
      },
      {
        dayNumber: 2,
        overallDay: 16,
        title: 'Day 2',
        activities: [
          {
            id: 'm3-d2-a1',
            moduleId: 3,
            dayNumber: 2,
            overallDay: 16,
            category: 'Exercise',
            name: 'Full-Body Stretch',
            instructions:
              'Complete a 10-15 minute full-body stretching session, releasing tension in your neck, shoulders, back, and hamstrings.',
            estimatedMinutes: 15,
          },
          {
            id: 'm3-d2-a2',
            moduleId: 3,
            dayNumber: 2,
            overallDay: 16,
            category: 'Sleep Hygiene',
            name: 'Consistent Bedtime',
            instructions:
              'Commit to going to sleep and waking up at the exact same scheduled time today, avoiding irregular shifts.',
            estimatedMinutes: 10,
          },
        ],
      },
      {
        dayNumber: 3,
        overallDay: 17,
        title: 'Day 3',
        activities: [
          {
            id: 'm3-d3-a1',
            moduleId: 3,
            dayNumber: 3,
            overallDay: 17,
            category: 'Exercise',
            name: 'Bodyweight Circuit',
            instructions:
              'Perform 15 minutes of light-to-moderate bodyweight exercises such as squats, push-ups, lunges, and gentle core work.',
            estimatedMinutes: 15,
          },
          {
            id: 'm3-d3-a2',
            moduleId: 3,
            dayNumber: 3,
            overallDay: 17,
            category: 'Sleep Hygiene',
            name: 'Cool Room',
            instructions:
              'Optimize your bedroom environment for deep sleep by keeping the room cool (around 65°F / 18°C), dark, and quiet.',
            estimatedMinutes: 10,
          },
        ],
      },
      {
        dayNumber: 4,
        overallDay: 18,
        title: 'Day 4',
        activities: [
          {
            id: 'm3-d4-a1',
            moduleId: 3,
            dayNumber: 4,
            overallDay: 18,
            category: 'Exercise',
            name: 'Active Breaks',
            instructions:
              'Take three 2-minute active movement breaks throughout the day—stand up, shake out your limbs, or take the stairs.',
            estimatedMinutes: 10,
          },
          {
            id: 'm3-d4-a2',
            moduleId: 3,
            dayNumber: 4,
            overallDay: 18,
            category: 'Sleep Hygiene',
            name: 'Caffeine Cutoff',
            instructions:
              'Avoid caffeine, energy drinks, and heavy stimulants at least 8 to 10 hours before your planned bedtime.',
            estimatedMinutes: 5,
          },
        ],
      },
      {
        dayNumber: 5,
        overallDay: 19,
        title: 'Day 5',
        activities: [
          {
            id: 'm3-d5-a1',
            moduleId: 3,
            dayNumber: 5,
            overallDay: 19,
            category: 'Exercise',
            name: 'Yoga Session',
            instructions:
              'Follow a 15-20 minute gentle or restorative yoga sequence focusing on rhythmic breath, posture, and flexibility.',
            estimatedMinutes: 20,
          },
          {
            id: 'm3-d5-a2',
            moduleId: 3,
            dayNumber: 5,
            overallDay: 19,
            category: 'Sleep Hygiene',
            name: 'Wind-down Routine',
            instructions:
              'Create a calming 20-minute pre-bed ritual: dim lights, read physical book, listen to ambient sounds, or sip herbal tea.',
            estimatedMinutes: 20,
          },
        ],
      },
      {
        dayNumber: 6,
        overallDay: 20,
        title: 'Day 6',
        activities: [
          {
            id: 'm3-d6-a1',
            moduleId: 3,
            dayNumber: 6,
            overallDay: 20,
            category: 'Exercise',
            name: 'Cardio Session',
            instructions:
              'Engage in 20-30 minutes of aerobic activity that gets your heart pumping—jogging, cycling, dancing, or swimming.',
            estimatedMinutes: 25,
          },
          {
            id: 'm3-d6-a2',
            moduleId: 3,
            dayNumber: 6,
            overallDay: 20,
            category: 'Sleep Hygiene',
            name: 'No Late Meals',
            instructions:
              'Finish your last meal or heavy snack at least 2 to 3 hours before sleep to allow proper digestion and deeper rest.',
            estimatedMinutes: 10,
          },
        ],
      },
      {
        dayNumber: 7,
        overallDay: 21,
        title: 'Day 7',
        activities: [
          {
            id: 'm3-d7-a1',
            moduleId: 3,
            dayNumber: 7,
            overallDay: 21,
            category: 'Exercise',
            name: 'Mindful Recovery',
            instructions:
              'Dedicate today to active recovery: a leisurely stroll, gentle mobility, foam rolling, or restorative outdoor time.',
            estimatedMinutes: 20,
          },
          {
            id: 'm3-d7-a2',
            moduleId: 3,
            dayNumber: 7,
            overallDay: 21,
            category: 'Sleep Hygiene',
            name: 'Morning Light',
            instructions:
              'Get 10-15 minutes of natural sunlight in your eyes within an hour of waking up to set your circadian rhythm.',
            estimatedMinutes: 15,
          },
        ],
      },
    ],
  },
  {
    id: 4,
    weekNumber: 4,
    title: 'Meditation & Gratitude Visit',
    subtitle: 'Module 4 · Week 4',
    shortDescription:
      'Quiet mind-wandering with daily mindfulness meditation and culminate your practice in the life-changing positive psychology Gratitude Visit.',
    focusAreas: ['Meditation', 'Gratitude Visit'],
    scienceSummary:
      'Mindfulness suppresses the default mode network (rumination), while the Gratitude Visit yields one of the largest single spikes in measured subjective happiness.',
    accentColor: 'indigo',
    days: [
      {
        dayNumber: 1,
        overallDay: 22,
        title: 'Day 1',
        activities: [
          {
            id: 'm4-d1-a1',
            moduleId: 4,
            dayNumber: 1,
            overallDay: 22,
            category: 'Meditation',
            name: '5-Minute Breathwork',
            instructions:
              'Sit comfortably and practice 5 minutes of focused box breathing or 4-7-8 breathing, observing the natural airflow.',
            estimatedMinutes: 5,
          },
          {
            id: 'm4-d1-a2',
            moduleId: 4,
            dayNumber: 1,
            overallDay: 22,
            category: 'Gratitude Visit',
            name: 'Identify Recipient',
            instructions:
              'Think of someone still alive who made a tremendous positive difference in your life whom you have never properly thanked.',
            estimatedMinutes: 10,
          },
        ],
      },
      {
        dayNumber: 2,
        overallDay: 23,
        title: 'Day 2',
        activities: [
          {
            id: 'm4-d2-a1',
            moduleId: 4,
            dayNumber: 2,
            overallDay: 23,
            category: 'Meditation',
            name: 'Body Scan',
            instructions:
              'Spend 10 minutes mentally scanning from your toes to the crown of your head, observing sensations without judgment.',
            estimatedMinutes: 10,
          },
          {
            id: 'm4-d2-a2',
            moduleId: 4,
            dayNumber: 2,
            overallDay: 23,
            category: 'Gratitude Visit',
            name: 'Brainstorming',
            instructions:
              'List specific memories, actions, words, and lasting impacts this person had on your journey and who you are today.',
            estimatedMinutes: 15,
          },
        ],
      },
      {
        dayNumber: 3,
        overallDay: 24,
        title: 'Day 3',
        activities: [
          {
            id: 'm4-d3-a1',
            moduleId: 4,
            dayNumber: 3,
            overallDay: 24,
            category: 'Meditation',
            name: 'Loving-Kindness',
            instructions:
              'Practice Metta meditation for 8-10 minutes, silently repeating wishes of safety, health, happiness, and peace for yourself and others.',
            estimatedMinutes: 10,
          },
          {
            id: 'm4-d3-a2',
            moduleId: 4,
            dayNumber: 3,
            overallDay: 24,
            category: 'Gratitude Visit',
            name: 'Drafting Letter',
            instructions:
              'Draft a heartfelt letter (around 300 words) describing specifically what this person did and how it shaped your life.',
            estimatedMinutes: 20,
          },
        ],
      },
      {
        dayNumber: 4,
        overallDay: 25,
        title: 'Day 4',
        activities: [
          {
            id: 'm4-d4-a1',
            moduleId: 4,
            dayNumber: 4,
            overallDay: 25,
            category: 'Meditation',
            name: '5-Sense Grounding',
            instructions:
              'Practice the 5-4-3-2-1 grounding technique: notice 5 things you see, 4 you feel, 3 you hear, 2 you smell, and 1 you taste.',
            estimatedMinutes: 5,
          },
          {
            id: 'm4-d4-a2',
            moduleId: 4,
            dayNumber: 4,
            overallDay: 25,
            category: 'Gratitude Visit',
            name: 'Refining Letter',
            instructions:
              'Read through your gratitude letter, polish the phrasing, ensure it is personal and concrete, and prepare the final copy.',
            estimatedMinutes: 15,
          },
        ],
      },
      {
        dayNumber: 5,
        overallDay: 26,
        title: 'Day 5',
        activities: [
          {
            id: 'm4-d5-a1',
            moduleId: 4,
            dayNumber: 5,
            overallDay: 26,
            category: 'Meditation',
            name: 'Guided Mindfulness',
            instructions:
              'Practice 10 minutes of open mindful awareness, anchoring your attention on the present moment and breath.',
            estimatedMinutes: 10,
          },
          {
            id: 'm4-d5-a2',
            moduleId: 4,
            dayNumber: 5,
            overallDay: 26,
            category: 'Gratitude Visit',
            name: 'Schedule Meeting',
            instructions:
              'Reach out to the person to arrange a face-to-face meeting or video call, keeping the exact purpose of the letter a surprise if possible.',
            estimatedMinutes: 10,
          },
        ],
      },
      {
        dayNumber: 6,
        overallDay: 27,
        title: 'Day 6',
        activities: [
          {
            id: 'm4-d6-a1',
            moduleId: 4,
            dayNumber: 6,
            overallDay: 27,
            category: 'Meditation',
            name: 'Thought Watching',
            instructions:
              'Practice sitting as an objective observer of your thoughts for 10 minutes, imagining them passing like clouds in the sky.',
            estimatedMinutes: 10,
          },
          {
            id: 'm4-d6-a2',
            moduleId: 4,
            dayNumber: 6,
            overallDay: 27,
            category: 'Gratitude Visit',
            name: 'The Gratitude Visit',
            instructions:
              'Meet with the recipient and read your gratitude letter aloud to them in person or over video call without rushing.',
            estimatedMinutes: 30,
          },
        ],
      },
      {
        dayNumber: 7,
        overallDay: 28,
        title: 'Day 7',
        activities: [
          {
            id: 'm4-d7-a1',
            moduleId: 4,
            dayNumber: 7,
            overallDay: 28,
            category: 'Meditation',
            name: 'Open Awareness',
            instructions:
              'Engage in a 10-15 minute silent meditation resting in pure, open awareness of the present moment with gratitude.',
            estimatedMinutes: 15,
          },
          {
            id: 'm4-d7-a2',
            moduleId: 4,
            dayNumber: 7,
            overallDay: 28,
            category: 'Gratitude Visit',
            name: 'Reflection',
            instructions:
              'Reflect on the experience of the Gratitude Visit: how it felt to deliver it, their emotional response, and how it shifted your relationship.',
            estimatedMinutes: 15,
          },
        ],
      },
    ],
  },
];

export const TOTAL_ACTIVITIES = 56;
export const TOTAL_DAYS = 28;
