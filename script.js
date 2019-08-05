function draw_gr(labels, people_in, people_out) {

    Chart.defaults.global.defaultFontFamily = "Lato";
    Chart.defaults.global.defaultFontSize = 18;

    var data_in = {
        label: "people_in",
        data: people_in,
        borderColor: 'red',
        backgroundColor: "rgba(255,0,0,0.3)"

    };
    var data_out = {
        label: "people_out",
        data: people_out,
        borderColor: 'blue',
        backgroundColor: "rgba(0,0,255,0.3)"
    };
    var data_main = {
      labels: labels,
      datasets: [data_in, data_out]
    };
    var lineChart = new Chart(speedCanvas, {
      height: 260,
      type: 'line',
      data: data_main
    });
}



var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://37.46.129.83:8000', true);
xhr.send();
console.log(xhr.readyState);

xhr.onload = function() {
  if (xhr.status != 200) {
    alert(`Error ${xhr.statusText}`);
  } else {
    var resp = xhr.responseText
    var jsonObject = JSON.parse(resp);
    var keys = Object.keys(jsonObject)
    var people_in = [];
    var people_out = [];
    for (var i = 0; i < keys.length; i++) {
        console.log(jsonObject[keys[i]]["IN"])
        people_in.push(jsonObject[keys[i]]["IN"])
        people_out.push(jsonObject[keys[i]]["OUT"])
    }
    //console.log(people_in)
    draw_gr(keys, people_in, people_out);
  }
};

xhr.onerror = function() {
  alert("Request failed");
};