export default function timeConverter(time) {
  const updated_at_date = new Date(time);
  const current_date = new Date();

  const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? 'PM' : 'AM';
  
    hours = hours % 12;
    hours = hours || 12;
  
    const formattedTime = `${hours}:${minutes.toString().padStart(2, '0')} ${period}`;
    return formattedTime;
  };
  
  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
  
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  };
  
  const isSameDay = (
    current_date.getDate() === updated_at_date.getDate() &&
    current_date.getMonth() === updated_at_date.getMonth() &&
    current_date.getFullYear() === updated_at_date.getFullYear()
  );
  
  const isYesterday = (
    current_date.getDate() - updated_at_date.getDate() === 1 &&
    current_date.getMonth() === updated_at_date.getMonth() &&
    current_date.getFullYear() === updated_at_date.getFullYear()
  );
  
  if (isSameDay) {
    const formatted_time = formatTime(updated_at_date);
    return formatted_time;
  } else if (isYesterday) {
    return 'Yesterday';
  } else {
    const formatted_date = formatDate(updated_at_date);
    return formatted_date;
  }
}