//  [6]Y. Holtz, "Basic line chart in d3.js", D3-graph-gallery.com, 2021. [Online]. Available: https://www.d3-graph-gallery.com/graph/line_basic.html. [Accessed: 21- Jan- 2021].
// From this source I have adapted the dimensions of the graph, adjusted the data file being read and the formatting of the data, and converted the graphing code into a class.
/**
 * Set variables for the dimensions and margins of a graph. This is a global variable so can be used by any following functions
 */
const margin = { top: 10, right: 30, bottom: 50, left: 80 }
const width = 480 - margin.left - margin.right
const height = 430 - margin.top - margin.bottom

/**
 * Append the svg object of first graph to the corresponding div element with the id of #my_dataviz1. svg object has dimensions and margins from the globally set varable "margin"
 */
const svg1 = d3.select('#my_dataviz1')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

/**
 * Append the svg object of second graph to the corresponding div element with the id of #my_dataviz2. svg object has dimensions and margins from the globally set varable "margin"
 */
const svg2 = d3.select('#my_dataviz2')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform',
    'translate(' + margin.left + ',' + margin.top + ')')

/**
 * Plots data onto an svg object
 */
class Graph {
  /**
     * Plots data onto an svg object
     * @param {string} data The name of the file containing the data to be plotted on the graph
     * @param {object} svg The svg opject to append the data from the data file to
     */
  constructor (data, svg) {
    this.data = data
    this.svg = svg
  }

  /**
     * A function to read the instance of the data file, and append it to the instance of the svg file
     * @param {string} ylabel the title of the y axis
     */
  readdata (ylabel) {
    const svg = this.svg
    // Read the data
    d3.csv(this.data,

      // When reading the csv, I must format variables:
      function (d) {
        return { date: d3.timeParse('%Y/%m/%d')(d.date), value: d.value }
      },
      // Now I can use this dataset:
      function (data) {
        // Add X axis  it is a date format
        const x = d3.scaleTime()
          .domain(d3.extent(data, function (d) { return d.date }))
          .range([0, width])
        svg.append('g')
          .attr('transform', 'translate(0,' + height + ')')
          .call(d3.axisBottom(x).ticks(d3.timeMonth)
            .tickFormat(d3.timeFormat('%b')))

        svg.append('text')
          .attr('class', 'x label')
          .attr('text-anchor', 'end')
          .attr('x', width - 170)
          .attr('y', height + 40)
          .text('Date')

        // Add Y axis
        const y = d3.scaleLinear()
          .domain([0, d3.max(data, function (d) { return +d.value })])
          .range([height, 0])
        svg.append('g')
          .call(d3.axisLeft(y))

        svg.append('text')
          .attr('class', 'y label')
          .attr('text-anchor', 'end')
          .attr('x', -80)
          .attr('y', -70)
          .attr('dy', '.75em')
          .attr('transform', 'rotate(-90)')
          .text(ylabel)

        // Add the line
        svg.append('path')
          .datum(data)
          .attr('fill', 'none')
          .attr('stroke', 'steelblue')
          .attr('stroke-width', 1.5)
          .attr('d', d3.line()
            .x(function (d) { return x(d.date) })
            .y(function (d) { return y(d.value) })
          )
      }
    )
  }
}

// My two instances of graphs that i want to plot
const u = (new Graph('data1.csv', svg1).readdata('Number of daily positive cases'))
const t = (new Graph('data2.csv', svg2).readdata('Number of daily deaths'))
