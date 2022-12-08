import dayjs from "dayjs";

export default function Date({ dateString }) {
  const date = dayjs(dateString).format("ddd, MMM DD, YYYY").toString();
  return <time dateTime={dateString}>{date}</time>;
}
