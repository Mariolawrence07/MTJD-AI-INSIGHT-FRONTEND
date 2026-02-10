import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

const SelectionCard = ({
  icon,
  iconColorClass,
  title,
  description,
  features = [],
  buttonLabel,
  buttonVariant = "default",
  onClick,
}) => (
  <Card className="group relative overflow-hidden border-2 p-8 transition-all hover:border-primary hover:shadow-lg">
    <div
      className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl ${iconColorClass}`}
    >
      <Icon icon={icon} className="h-7 w-7" />
    </div>

    <h3 className="mb-3 text-2xl font-semibold">{title}</h3>

    <p className="mb-6 leading-relaxed text-muted-foreground">
      {description}
    </p>

    <ul className="mb-8 space-y-2 text-sm text-muted-foreground">
      {features.map((f, i) => (
        <li key={i} className="flex items-center gap-2">
          <Icon icon="ph:check-circle-fill" className="h-5 w-5 text-primary" />
          <span>{f}</span>
        </li>
      ))}
    </ul>

    <Button className="w-full" size="lg" variant={buttonVariant} onClick={onClick}>
      {buttonLabel}
      <Icon icon="ph:arrow-right" className="ml-2 h-5 w-5" />
    </Button>
  </Card>
);

export default SelectionCard;