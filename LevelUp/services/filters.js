// Date-based quest categorization shared by Home and the Quests tab.

function endOfToday() {
  const d = new Date();
  d.setHours(23, 59, 59, 999);
  return d;
}

export function isOverdue(quest) {
  return (
    !quest.completed && quest.dueDate && new Date(quest.dueDate) < new Date() &&
    new Date(quest.dueDate) < startOfToday()
  );
}

function startOfToday() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

// Incomplete quests due today, overdue, or without a due date.
export function isToday(quest) {
  if (quest.completed) return false;
  if (!quest.dueDate) return true;
  return new Date(quest.dueDate) <= endOfToday();
}

export function isUpcoming(quest) {
  if (quest.completed) return false;
  return quest.dueDate && new Date(quest.dueDate) > endOfToday();
}

export function formatDueDate(iso) {
  if (!iso) return null;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(new Date(iso));
}
