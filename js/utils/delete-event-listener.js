export function deleteEventListener (element) {
  const elementClone = element.cloneNode(true);
  element.replaceWith(elementClone);
}
