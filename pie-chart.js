// [4]T. Horn, "Self-contained D3 Pie Chart Function", Medium, 2021. [Online]. Available: https://travishorn.com/self-contained-d3-pie-chart-function-e5b7422be676. [Accessed: 21- Jan- 2021].
// From this source I have adapted the dimensions of the pie chart, the colours used for the segments, the data represented on the graph, and the content and styling of the labels.
/**
 * A function that plots a pie chart
 * @param {string} selector id of the div to append the svg
 * @param {Array} data an array with a nested dictionary for each item.
 * Contains the data values for each segment and their corresponding label
 */
const pieChart = (selector, data) => {
  const size = 550
  const fourth = size / 4
  const half = size / 2
  const labelOffset = fourth * 1.2
  const total = data.reduce((acc, cur) => acc + cur.value, 0)
  const container = d3.select(selector)

  const chart = container.append('svg')
    .style('width', '75%')
    .attr('viewBox', `0 0 ${size} ${size}`)

  const plotArea = chart.append('g')
    .attr('transform', `translate(${half}, ${half})`)

  const color = d3.scaleOrdinal()
    .domain(data.map(d => d.name))
    .range(['#AED6F1', '#5FB25E', '#FFC300', '#FF5733', '#6DAAF5'])

  const pie = d3.pie()
    .sort(null)
    .value(d => d.value)

  const arcs = pie(data)

  const arc = d3.arc()
    .innerRadius(0)
    .outerRadius(fourth)

  const arcLabel = d3.arc()
    .innerRadius(labelOffset)
    .outerRadius(labelOffset)

  plotArea.selectAll('path')
    .data(arcs)
    .enter()
    .append('path')
    .attr('fill', d => color(d.data.name))
    .attr('stroke', 'white')
    .attr('d', arc)

  const labels = plotArea.selectAll('text')
    .data(arcs)
    .enter()
    .append('text')
    .style('text-anchor', 'middle')
    .style('alignment-baseline', 'middle')
    .style('font-size', '10px')
    .attr('transform', d => `translate(${arcLabel.centroid(d)})`)

  labels.append('tspan')
    .attr('y', '-0.6em')
    .attr('x', 0)
    .style('font-weight', '')
    .text(d => `${d.data.name}`)

  labels.append('tspan')
    .attr('y', '0.6em')
    .attr('x', 0)
    .text(d => `${d.data.value}%`)
}

pieChart('#pie-chart', [
  { name: 'Very worried', value: 16 },
  { name: 'Somewhat worried', value: 52 },
  { name: 'neither worried or unworried', value: 19 },
  { name: 'somewhat unworried', value: 6 },
  { name: 'not at all worried', value: 7 }
])
