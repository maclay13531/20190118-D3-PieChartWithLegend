$(document).ready(function () {
    var data = [
        {
            type: "Vowel",
            count: 15,
        },
        {
            type: "Consonent",
            count: 45,
        },
        {
            type: "Space + Punctuation",
            count: 10,
        }
    ];

    var width = 400;
    var height = 400;
    var radius = Math.min(width, height) / 2;
    var donutWidth = 70;
    var legendRectSize = 20;
    var legendSpacing = 10;

    var color = d3.scaleOrdinal()
        .range(["#173753", "#6daedb", "#2892d7"]);

    var svg = d3.select("#chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")");

    var arc = d3.arc()
        // .innerRadius(0)
        .innerRadius(radius - donutWidth)
        .outerRadius(radius);

    var pie = d3.pie()
        .value(function (d) { return d.count; })
        .sort(null);

    var path = svg.selectAll("path")
        .data(pie(data))
        .enter()
        .append("path")
        .attr("d", arc)
        .attr("fill", function (d, i) {
            return color(d.data.type);
        });

    var legend = svg.selectAll(".legend")
        .data(color.domain())
        .enter()
        .append("g")
        .attr("class", "legend")
        .attr('transform', function (d, i) {
            var height = legendRectSize + legendSpacing;
            var offset = height * color.domain().length / 2;
            var horz = -2 * legendRectSize;
            var vert = i * height - offset;
            return 'translate(' + horz + ',' + vert + ')';
        });

    legend.append("rect")
        .attr("width", legendRectSize)
        .attr("height", legendRectSize)
        .style("fill", color)
        .style("stroke", color);

    legend.append('text')
        .attr("x", legendRectSize + legendSpacing)
        .attr("y", legendRectSize - legendSpacing + 2)
        .text(function (d) { return d.toUpperCase(); });
});
