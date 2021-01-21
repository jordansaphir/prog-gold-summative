//  [3]"Bootstrap Scrollspy", W3schools.com, 2021. [Online]. Available: https://www.w3schools.com/bootstrap/bootstrap_scrollspy.asp. [Accessed: 21- Jan- 2021].
/**
 * JQuery function that automatically updates navbar based on scroll position to indicate which link is currently active in the viewport.
 */
$(document).ready(function () {
  $('body').scrollspy({ target: '.navbar', offset: 50 })
})

/**
 * A function that shows a tooltip on the svg map of the UK
 * @param {Event} evt  An event object
 * @param {string} text The text to be displayed on the tool tip
 */
function showTooltip (evt, text) {
  const tooltip = document.getElementById('tooltip')
  tooltip.innerHTML = text
  tooltip.style.display = 'block'
  tooltip.style.left = evt.pageX + 10 + 'px'
  tooltip.style.top = evt.pageY + 10 + 'px'
}

/**
 * A function that hides a tooltip from the svg map of the UK once the mouse leaves the area
 */
function hideTooltip () {
  const tooltip = document.getElementById('tooltip')
  tooltip.style.display = 'none'
}
