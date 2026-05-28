export type ProjectLifecycleStatus = "completed" | "current" | "upcoming";
export type ProjectLifecycleMode = "auto" | "manual";

export interface ProjectLifecycleFields {
	status?: ProjectLifecycleStatus;
	lifecycleMode?: ProjectLifecycleMode;
	startDate?: string;
	endDate?: string;
	date?: string;
}

const fallbackStatus: ProjectLifecycleStatus = "upcoming";

function parseDate(value?: string): Date | null {
	if (!value) return null;
	const trimmed = value.trim();
	if (!trimmed) return null;
	const date = /^\d{4}-\d{2}-\d{2}$/.test(trimmed)
		? new Date(`${trimmed}T00:00:00.000Z`)
		: new Date(trimmed);
	return Number.isNaN(date.getTime()) ? null : date;
}

function inferEndDate(project: ProjectLifecycleFields): Date | null {
	const endDate = parseDate(project.endDate);
	if (endDate) return endDate;
	const years = project.date?.match(/\b(?:19|20)\d{2}\b/g);
	if (!years?.length) return null;
	const year = years[years.length - 1];
	return new Date(`${year}-12-31T00:00:00.000Z`);
}

function getFallbackStatus(project: ProjectLifecycleFields): ProjectLifecycleStatus {
	return project.status ?? fallbackStatus;
}

export function getProjectLifecycle(
	project: ProjectLifecycleFields,
	now = new Date(),
): ProjectLifecycleStatus {
	if (project.lifecycleMode === "manual") return getFallbackStatus(project);

	const startDate = parseDate(project.startDate);
	const endDate = parseDate(project.endDate);
	const currentTime = now.getTime();

	if (startDate && currentTime < startDate.getTime()) return "upcoming";
	if (endDate && currentTime > endDate.getTime()) return "completed";
	if (startDate && currentTime >= startDate.getTime()) return "current";

	return getFallbackStatus(project);
}

export function formatProjectCompletedAgo(
	project: ProjectLifecycleFields,
	now = new Date(),
): string {
	const completedDate = inferEndDate(project);
	if (!completedDate) return "Completed";

	const elapsedMs = now.getTime() - completedDate.getTime();
	if (elapsedMs < 0) return "Completed";

	const dayMs = 24 * 60 * 60 * 1000;
	const elapsedDays = Math.floor(elapsedMs / dayMs);
	const formatter = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

	if (elapsedDays < 1) return "Completed today";
	if (elapsedDays < 60) return formatter.format(-elapsedDays, "day");

	const elapsedMonths = Math.floor(elapsedDays / 30);
	if (elapsedMonths < 24) return formatter.format(-elapsedMonths, "month");

	const elapsedYears = Math.floor(elapsedDays / 365);
	return formatter.format(-elapsedYears, "year");
}

export function sortProjectsByLifecycleDate<T extends ProjectLifecycleFields>(
	projects: T[],
	status: ProjectLifecycleStatus,
): T[] {
	return [...projects].sort((a, b) => {
		const aDate = parseDate(status === "completed" ? a.endDate : a.startDate)
			?? inferEndDate(a)
			?? parseDate(a.startDate);
		const bDate = parseDate(status === "completed" ? b.endDate : b.startDate)
			?? inferEndDate(b)
			?? parseDate(b.startDate);

		const aTime = aDate?.getTime() ?? 0;
		const bTime = bDate?.getTime() ?? 0;

		return status === "completed" ? bTime - aTime : aTime - bTime;
	});
}
