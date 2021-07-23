/* export function deleteEventListener (element, event, eventHandler) {
  element.removeEventListener(event, eventHandler);
} */
export function deleteEventListener (element) {
  const elementClone = element.cloneNode(true);
  element.replaceWith(elementClone);
}
