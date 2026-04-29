export const formatDatetime = (
    dateStr: string,
  ): string => {

  const date = new Date(dateStr);

  const options: Intl.DateTimeFormatOptions = {
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit', 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: false,
      timeZone: 'Asia/Tokyo'
  }

  const formattedDate = new Intl.DateTimeFormat('ja-JP', options).format(date);

  return formattedDate

}