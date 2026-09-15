export const currentUser = {
  name: 'Mounika Vaka',
  handle: 'mounikavaka',
  email: 'mounika.vaka@gmail.com',
  plan: 'Free',
  followers: 128,
  following: 64,
  playlists: 8,
}

export const notifications = [
  {
    id: 'n1',
    title: 'New for you',
    body: 'Butta Bomma is trending in Tollywood Hits.',
    time: '2h ago',
    unread: true,
    to: '/playlist/p1',
  },
  {
    id: 'n2',
    title: 'Sid Sriram',
    body: 'Inkem Inkem Inkem Kaavaale is back in your mix.',
    time: '5h ago',
    unread: true,
    to: '/artist/a1',
  },
  {
    id: 'n3',
    title: 'Cinema Talkies',
    body: 'A new episode just dropped.',
    time: '1d ago',
    unread: true,
    to: '/search?q=Cinema%20Talkies',
  },
  {
    id: 'n4',
    title: 'Liked Songs',
    body: 'We added Srivalli to your weekly mix.',
    time: '2d ago',
    unread: false,
    to: '/liked',
  },
  {
    id: 'n5',
    title: 'Pushpa',
    body: 'Oo Antava Oo Oo Antava is popular near you.',
    time: '3d ago',
    unread: false,
    to: '/album/al2',
  },
]

export const premiumPlans = [
  {
    id: 'individual',
    name: 'Individual',
    price: '₹119',
    period: 'month',
    perks: ['Ad-free music', 'Download songs', 'Play any track', '1 account'],
  },
  {
    id: 'duo',
    name: 'Duo',
    price: '₹149',
    period: 'month',
    perks: ['2 Premium accounts', 'Duo Mix playlist', 'Ad-free listening', 'Downloads'],
  },
  {
    id: 'family',
    name: 'Family',
    price: '₹179',
    period: 'month',
    perks: ['Up to 6 accounts', 'Block explicit music', 'Family Mix', 'Downloads'],
  },
]
