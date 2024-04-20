export const getFreshId = () => {
  const max = 79228162514264337593543950335; // largest number that can be represented with 24 bit hex
  const id = Math.floor(Math.random() * max).toString(16);
  console.log(id);
  return id;
  // return new Date().getTime().toString();
};

export const scrollToElementWithId = (id: string) => {
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "nearest",
  });
};

const getMonthString = (month: number) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  return months[month];
};

export const formatDateTime = (dueDateStr: string) => {
  if (!dueDateStr) {
    return "<no date>";
  }
  const dueDate = new Date(dueDateStr);
  // Format date
  const month = getMonthString(dueDate.getMonth());
  const date = dueDate.getDate();
  const year = dueDate.getFullYear();
  const fullDate = `${month} ${date}, ${year} `;

  // Format minutes
  const minutes = ("0" + dueDate.getMinutes()).slice(-2);

  // Format hours
  const hour24Format = dueDate.getHours();
  const hour12Format =
    hour24Format > 0 && hour24Format < 13
      ? hour24Format
      : Math.abs(hour24Format - 12);
  const amOrPm = hour24Format < 12 ? "am" : "pm";

  // Format datetime
  const time = `${hour12Format}:${minutes}${amOrPm}`;
  const formattedDueDate = `${fullDate} at ${time}`;
  return formattedDueDate;
};
