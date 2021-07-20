export function deleteEventListener (element, event, eventHandler) {
  element.removeEventListener(event, eventHandler);
}
