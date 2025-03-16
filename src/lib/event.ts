export interface Event {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  time: string; // in military time (i.e. 0900, 1251, etc.)
}



export function formatDate(dateString: string): string {
  const date = new Date(dateString);

  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).replace(",", " of");
}

export function formatMilitaryTime(militaryTime: string, useTwelveHour: boolean = true): string {
  if (!/^\d{4}$/.test(militaryTime)) {
    throw new Error('Military time must be exactly 4 digits');
  }

  const hours = parseInt(militaryTime.slice(0, 2), 10);
  const minutes = parseInt(militaryTime.slice(2), 10);

  if (hours > 23 || minutes > 59) {
    throw new Error('Invalid time format');
  }

  const paddedMinutes = minutes.toString().padStart(2, '0');

  if (useTwelveHour) {
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12; // Convert 0 to 12 for midnight
    return `${displayHours}:${paddedMinutes} ${period}`;
  } else {
    const paddedHours = hours.toString().padStart(2, '0');
    return `${paddedHours}:${paddedMinutes}`;
  }
}

export const startingEvents: EventsByDate = {
  "2024-03-11": [
    {
      id: "event-1",
      title: "Coffee with Alex",
      description: "Meet with Alex to brainstorm ideas for the upcoming product launch.We'll review market research and competitor analysis to identify potential opportunities and challenges.",
      imageUrl:
        "https://fastly.picsum.photos/id/312/1920/1080.jpg?hmac=OD_fP9MUQN7uJ8NBR7tlii78qwHPUROGgohG4w16Kjw",
      time: "0900",
    },
    {
      id: "event-2",
      title: "Team Standup",
      description: "Weekly standup meeting with the dev team. Discuss progress, blockers, and align on next week's priorities.",
      imageUrl: "http://fastly.picsum.photos/id/737/1920/1080.jpg?hmac=aFzER8Y4wcWTrXVx2wVKSj10IqnygaF33gESj0WGDwI",
      time: "1400",
    },
  ],
  "2024-03-12": [
    {
      id: "event-3",
      title: "Yoga Session",
      description: "Join for a relaxing yoga session to reduce stress and improve mindfulness. Suitable for all levels, focusing on gentle stretches.",
      imageUrl: "https://fastly.picsum.photos/id/392/1920/1080.jpg?hmac=Fvbf7C1Rcozg8EccwYPqsGkk_o6Bld2GQRDPZKWpd7g",
      time: "1200",
    },
    {
      id: "event-4",
      title: "Product Demo",
      description: "Demo of UI improvements and performance optimizations to gather stakeholder feedback.",
      imageUrl: "https://fastly.picsum.photos/id/249/1920/1080.jpg?hmac=cPMNdgGXRh6T_KhRMuaQjRtAx5cWRraELjtL2MHTfYs",
      time: "1530",
    },
  ],
  "2024-03-13": [
    {
      id: "event-5",
      title: "Client Meeting",
      description: "Review project progress, timeline adjustments, and outline roadmap for next quarter with the client.",
      imageUrl: "https://fastly.picsum.photos/id/908/1920/1080.jpg?hmac=MeG_oA1s75hHAL_4JzC ioh6--zyFTWSCTxOhe8ugvXo",
      time: "1130",
    },
  ],
}

export interface EventsByDate {
  [date: string]: Event[];
}
