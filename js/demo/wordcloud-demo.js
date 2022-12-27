var width = 960,
    height = 500

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);
d3.csv("./worddata.csv", function (data) {
    showCloud(data)
});

wordScale = d3.scale.linear().domain([0, 100]).range([0, 150]).clamp(true);
var svg = d3.select("svg")
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")

function showCloud(data) {
    d3.layout.cloud().size([960, 500])
        .words(data)
        .padding(5)
        .rotate(function () { return 0; })
        .font("Gowun Batang")
        .fontSize(function (d) { return wordScale(d.frequency); })
        .on("end", draw)
        .start();

    function draw(words) { 
        var cloud = svg.selectAll("text").data(words)
        cloud.enter()
            .append("text")
            .style("font-family", "Gowun Batang")
            .style("fill", function (d) {
                return "#405275";
            })
            .style("fill-opacity", .5)
            .attr("text-anchor", "middle") 
            .attr('font-size', 1)
            .text(function (d) {
                return d.text;
            }); 
        cloud
            .style("font-size", function (d) {
                return d.size + "px";
            })
            .attr("transform", function (d) {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .style("fill-opacity", 1); 
    }
}