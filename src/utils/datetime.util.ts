export function formatRelativeTime(createdAt: string): string {
  const currentDate = new Date();
  const postDate = new Date(createdAt);
  const timeDifference = currentDate.getTime() - postDate.getTime();
  const minutes = Math.floor(timeDifference / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);

  if (weeks > 0) {
    return `há ${weeks} semana${weeks > 1 ? 's' : ''}`;
  } else if (days > 0) {
    return `há ${days} dia${days > 1 ? 's' : ''}`;
  } else if (hours > 0) {
    return `há ${hours} hora${hours > 1 ? 's' : ''}`;
  } else if (minutes > 0) {
    return `há ${minutes} minuto${minutes > 1 ? 's' : ''}`;
  } else {
    return 'agora';
  }
}
