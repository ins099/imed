const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const formatDateTimeString = (
  dateString: string | Date,
  _format?: string,
) => {
  const date = new Date(dateString);
  const options = {day: '2-digit', month: 'long', year: 'numeric'};
  const formattedDate = date
    .toLocaleDateString('en-GB', options as any)
    .replace(/ /g, ' ');

  return formattedDate;
};

export const formateDate = (dateVal: string, type: string = 'dd-MM-YYYY') => {
  const date = dateVal ? new Date(dateVal) : new Date();
  // let month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  let day = String(date.getDate()).padStart(2, '0');
  let month = monthNames[date.getMonth()];
  let year = date.getFullYear();

  if (type === 'YYYY-MM-DD') {
    month = `${date.getMonth() + 1}`;
    return `${year}-${month}-${day}`;
  }

  return `${day}-${month}-${year}`;
};

// Utility to merge new data without duplicates
export const mergeDataWithoutDuplicates = (
  existingData: any[],
  newData: any[],
) => {
  const existingIds = existingData.map(item => item._id);
  return [
    ...existingData,
    ...newData.filter(item => !existingIds.includes(item._id)),
  ];
};

// Handle debounce for search function
// export const debounce = (func: Function, delay: number) => {
//   let timeoutId: NodeJS.Timeout;
//   return (...args: any[]) => {
//     if (timeoutId) clearTimeout(timeoutId);
//     timeoutId = setTimeout(() => {
//       func(...args);
//     }, delay);
//   };
// };

export function timeAgo(dateStr: string) {
  const now: any = new Date();
  const date: any = new Date(dateStr);
  const diffInMs = now - date;
  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInWeeks = Math.floor(diffInDays / 7);
  const diffInMonths = Math.floor(diffInDays / 30); // Approximate value for months

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hours ago`;
  } else if (diffInDays < 7) {
    return `${diffInDays} days ago`;
  } else if (diffInWeeks < 4) {
    return `${diffInWeeks} weeks ago`;
  } else {
    return `${diffInMonths} months ago`;
  }
}

export function extractPlaceDetails(data: any) {
  const placeName =
    data.address_components.find(
      (component: any) =>
        component.types.includes('establishment') ||
        component.types.includes('point_of_interest'),
    )?.long_name || '';

  const city =
    data.address_components.find((component: any) =>
      component.types.includes('locality'),
    )?.long_name || '';

  const country =
    data.address_components.find((component: any) =>
      component.types.includes('country'),
    )?.long_name || '';

  const description = data.formatted_address || '';

  return {
    id: data?.place_id,
    placeName,
    city,
    country,
    description,
  };
}
