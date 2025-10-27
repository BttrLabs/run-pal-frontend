import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, FileText, Dumbbell } from "lucide-react";
import Link from "next/link";

type WorkoutCardProps = {
  description: string;
  name: string;
  createdAt: string;
  training_id: string;
  slug: string;
};

export function WorkoutCard({
  description,
  name,
  createdAt,
  training_id,
  slug,
}: WorkoutCardProps) {
  const formattedDate = new Date(createdAt).toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <Link href={`/workouts/${slug}`}>
      <Card className="w-full hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="space-y-3 pb-4">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2 flex-1">
              <div className="p-2 rounded-lg bg-primary/10">
                <Dumbbell className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-xl font-bold text-balance leading-tight">
                {name}
              </CardTitle>
            </div>
            <Badge variant="secondary" className="text-xs font-mono shrink-0">
              #{training_id}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 pt-0">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <FileText className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
              <div className="space-y-1 flex-1 min-w-0">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Beschreibung
                </p>
                <p className="text-sm text-foreground leading-relaxed text-pretty">
                  {description}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2 border-t">
              <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Erstellt
                </p>
                <p className="text-sm text-foreground font-medium">
                  {formattedDate}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
