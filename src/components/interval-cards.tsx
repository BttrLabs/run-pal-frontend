"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Interval = {
  distance: number; // meters
  time: number; // seconds
  note?: string;
};

export function IntervalCards() {
  const [intervals, setIntervals] = useState<Interval[]>([]);
  const [distance, setDistance] = useState("");
  const [time, setTime] = useState("");
  const [note, setNote] = useState("");

  const addInterval = () => {
    if (!distance || !time) return;
    setIntervals([
      ...intervals,
      { distance: Number(distance), time: Number(time), note },
    ]);
    setDistance("");
    setTime("");
    setNote("");
  };

  return (
    <div className="space-y-4">
      <div className="mb-8 border border-border rounded-lg bg-background p-4 space-y-2">
        <Label>Distance (m)</Label>
        <Input
          type="number"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
        />
        <Label>Time (s)</Label>
        <Input
          type="number"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <Label>Note (optional)</Label>
        <Textarea value={note} onChange={(e) => setNote(e.target.value)} />
        <Button variant="ghost" className="w-full" onClick={addInterval}>
          Add Interval
        </Button>
      </div>
      {intervals.map((interval, idx) => (
        <div
          key={idx}
          className="p-4 border rounded-lg bg-background flex justify-between items-center"
        >
          <div>
            <p>
              Interval {idx + 1}: {interval.distance}m in {interval.time}s
            </p>
            {interval.note && (
              <p className="text-sm text-muted-foreground">{interval.note}</p>
            )}
          </div>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setIntervals(intervals.filter((_, i) => i !== idx))}
          >
            Delete
          </Button>
        </div>
      ))}
    </div>
  );
}
