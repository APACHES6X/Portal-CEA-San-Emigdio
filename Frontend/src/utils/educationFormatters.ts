// String formatters for the education section

export const formatDuration = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes} minutos`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours} hora${hours > 1 ? 's' : ''} ${mins} minutos` : `${hours} hora${hours > 1 ? 's' : ''}`;
};

export const formatParticipants = (min: number, max: number): string => {
  return `${min}-${max} personas`;
};

export const formatFileSize = (mb: number): string => {
  return `${mb.toFixed(1)} MB`;
};

export const formatPhotoCount = (count: number): string => {
  return `${count} fotos`;
};