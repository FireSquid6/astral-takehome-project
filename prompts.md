---
title: Prompts
description: I am storing and writing my prompts here
---

We're gonna do some pair programming. I need your help building a site with next js, react, typescript, tailwindcss, and catalyst UI. Are you familiar and experience with all of these tools? If not, I can provide you with the necessary context before we continue.

If you'd like, feel free to add more packages from npm at any time.

Mistakes are fine and a necessary process, but we want to avoid hallucinations. If I'm ever talking about something you don't understand, please just ask me to clarify.

---

I need to make a react component EventView that looks like the following:

```ts
export function EventView(props: { event: Event }) {
  // ...
}
```

It should display the event in a rounded card with the image at the top, the title and description right below the image, and the time at the top right of the image in a bubble

Here's the interface for the event:

```ts
export interface Event {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  time: string; // in military time (i.e. 0900, 1251, etc.)
}
```

We also have the helper function `formatMilitaryTime` that you can use as well. Don't redefine that or the event interface.

---

Now we need a new function, `DayView`. It should look like:
```ts
export function DayView(props: { date: string, events: Event[] }) {

}
```
The date is provided in the format `YYYY-MM-DD`. Make a helper function to convert it to the format "DD of (month), YYYY". The day view should display a list of EventViews sorted by time (soonest at the start).

---
