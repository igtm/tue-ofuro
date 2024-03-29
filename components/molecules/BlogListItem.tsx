import Link from "next/link";
import { VFC } from "react";

type Props = {
  title: string;
  href: string;
  dateTime?: string;
};

export const BlogListItem: VFC<Props> = (props) => {
  let dateTimeString = "----/--/--";
  if (props.dateTime != null) {
    const d = new Date(props.dateTime);
    if (!isNaN(d.getTime())) {
      dateTimeString = d.toLocaleDateString();
    }
  }

  return (
    <li>
      <div className="flex gap-4">
        <Link href={props.href} className="flex-grow hover:underline">
          <div className="grid gap-y-2">
            <div className="text-xs text-primary-500">{dateTimeString}</div>

            <div className="text-base text-primary-900">{props.title}</div>
          </div>
        </Link>
      </div>
    </li>
  );
};
