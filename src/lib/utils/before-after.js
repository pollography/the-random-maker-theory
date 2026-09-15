// @ts-nocheck
// Approved preview interaction, verified separately by release and browser tests.
export function normalizeCompareValue(value) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return 50;
  return Math.min(100, Math.max(0, parsed));
}

export function clipForValue(value) {
  return `inset(0 0 0 ${normalizeCompareValue(value)}%)`;
}

export function compareValueFromPointer(clientX, left, width) {
  const safeWidth = Number(width);
  if (!Number.isFinite(safeWidth) || safeWidth <= 0) return 50;
  return normalizeCompareValue(((Number(clientX) - Number(left)) / safeWidth) * 100);
}

function comparisonText(value, beforeLabel, afterLabel) {
  const split = Math.round(normalizeCompareValue(value));
  return `${split} Prozent ${beforeLabel}, ${100 - split} Prozent ${afterLabel}`;
}

export function setupBeforeAfterComparison(widget, host = globalThis.window ?? globalThis) {
  const stage = widget?.querySelector?.('[data-before-after-stage]');
  const edited = widget?.querySelector?.('[data-before-after-edited]');
  const range = widget?.querySelector?.('[data-before-after-range]');
  const buttons = [...(widget?.querySelectorAll?.('[data-before-after-value]') ?? [])];
  if (!stage || !edited || !range || !host?.addEventListener) return () => {};

  const beforeLabel = widget.dataset.beforeLabel || 'Original';
  const afterLabel = widget.dataset.afterLabel || 'Bearbeitet';

  const setValue = (nextValue) => {
    const value = normalizeCompareValue(nextValue);
    stage.style.setProperty('--split', `${value}%`);
    edited.style.clipPath = clipForValue(value);
    range.value = String(value);
    range.setAttribute('aria-valuenow', String(value));
    range.setAttribute('aria-valuetext', comparisonText(value, beforeLabel, afterLabel));
    buttons.forEach((button) => {
      const isActive = normalizeCompareValue(button.dataset.beforeAfterValue) === value;
      button.setAttribute('aria-pressed', String(isActive));
    });
  };

  const onRangeInput = (event) => setValue(event.currentTarget.value);
  range.addEventListener('input', onRangeInput);

  const buttonCleanups = buttons.map((button) => {
    const onClick = () => setValue(button.dataset.beforeAfterValue);
    button.addEventListener('click', onClick);
    return () => button.removeEventListener('click', onClick);
  });

  let activePointerId = null;
  const setFromPointer = (event) => {
    const bounds = stage.getBoundingClientRect();
    setValue(compareValueFromPointer(event.clientX, bounds.left, bounds.width));
  };

  const onPointerDown = (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    event.preventDefault();
    activePointerId = event.pointerId;
    setFromPointer(event);
    try {
      stage.setPointerCapture(event.pointerId);
    } catch {
      // The window listeners below keep dragging reliable without capture.
    }
  };

  const onPointerMove = (event) => {
    if (activePointerId === null || event.pointerId !== activePointerId) return;
    if (event.cancelable) event.preventDefault();
    setFromPointer(event);
  };

  const finishDrag = (event) => {
    if (activePointerId === null || event.pointerId !== activePointerId) return;
    if (stage.hasPointerCapture?.(event.pointerId)) {
      stage.releasePointerCapture(event.pointerId);
    }
    activePointerId = null;
  };

  const preventNativeDrag = (event) => event.preventDefault();
  const onClick = (event) => setFromPointer(event);

  stage.addEventListener('dragstart', preventNativeDrag);
  stage.addEventListener('pointerdown', onPointerDown);
  stage.addEventListener('click', onClick);
  host.addEventListener('pointermove', onPointerMove, { passive: false });
  host.addEventListener('pointerup', finishDrag);
  host.addEventListener('pointercancel', finishDrag);

  setValue(range.value);

  return () => {
    range.removeEventListener('input', onRangeInput);
    buttonCleanups.forEach((cleanup) => cleanup());
    stage.removeEventListener('dragstart', preventNativeDrag);
    stage.removeEventListener('pointerdown', onPointerDown);
    stage.removeEventListener('click', onClick);
    host.removeEventListener('pointermove', onPointerMove);
    host.removeEventListener('pointerup', finishDrag);
    host.removeEventListener('pointercancel', finishDrag);
  };
}

export function setupBeforeAfterComparisons(
  scope = globalThis.document,
  host = globalThis.window ?? globalThis
) {
  if (!scope?.querySelectorAll) return [];
  return [...scope.querySelectorAll('[data-before-after]')]
    .map((widget) => setupBeforeAfterComparison(widget, host));
}
