// <!-- code to generate the collapsible dataset info things -->

function generate_collapsible_dataset_info(){
  let s = ""
  for (let dataset_to_be_visualized of benchmark_datasets.map(d => d.Name)){
    s += `::: {.callout-note title="` + dataset_to_be_visualized + `" collapse=true appearance="minimal"}` + "\n\n"
    s += "```{ojs}\n"
    s += `//| echo: false\n
      make_sparkline("` + name_cleanup(dataset_to_be_visualized) + `")\n`
    s += "```\n\n"
    s += `<div id="named-list-` + name_cleanup(dataset_to_be_visualized) + `" data-bs-spy="scroll"  data-bs-target="db-nav-list" data-bs-offset="20" tabindex="0"></div>\n\n`
    s += "::: \n\n\n"
  }
  return s;
  // console.log(s);
}


function make_sparkline(bname){
  let b = benchmark_datasets.find(l => name_cleanup(l.Name) == bname)["sparkline data"].replaceAll("'", '"')
  try {
    b = JSON.parse(b)
    return Plot.plot({
    color: {
      range: ["steelblue"]
    },
    y: {nice:true},
    x: {nice:true},
    height: 400,
    marks: [
      Plot.line(b.num_nodes.map((d, i) => [i*5, d]), {marginTop: 30}),
      Plot.text(['Distribution of graph sizes by number of nodes in ' + bname], {frameAnchor: "Top",dy: -20})
    ]
  })
  } catch { return "No sparkline information to show" }
}

function generate_all_entry_rows(){
  for (let benchmark_dataset of benchmark_datasets.map(d => d.Name).filter(n => n.includes("Forums"))){
    let bname = name_cleanup(benchmark_dataset)
    //console.log("bname", bname)
    let named_list_dom = d3.select("#named-list-" + bname);
    named_list_dom.selectAll("*").remove()
    let entry =  benchmark_datasets.find(l => name_cleanup(l.Name) == bname);
    const paper_data = literature
    const origin_paper_data = paper_source
    if (named_list_dom != undefined) add_entry_row(named_list_dom, entry, paper_data, origin_paper_data, notionFolders)
    //else console.log("bname")
  }
}

async function add_entry_row(named_list_dom, entry, paper_data, origin_paper_data, notionFolders){

    if (entry["graph features handled"] != "" && entry["graph features handled"] != undefined){
        let tags = entry["graph features handled"].split(",")
        for (let j = 0; j < tags.length; j++){
            if (tags[j].charAt(0) == ' '){
                tags[j] = tags[j].substring(1).toLowerCase()
            }
            if (!graph_feature_tags.includes(tags[j])){
                graph_feature_tags.push(tags[j])
            }
        }
    }

    for (let element of paper_data){
        let features = (element["Graph feature"]).split(",")
        for (let feature of features){
            feature = feature.trim().toLowerCase()
            if (!graph_feature_tags.includes(feature)){
                graph_feature_tags.push(feature)
            }
        }
    }
        
        let infocontainer = named_list_dom.append("div")
            .attr("class", "container")
            .attr("id", "inforow_" + name_cleanup(entry["Name"]))
            .style("padding", "2%")

        let inforow = infocontainer.append("div")
            .append("div")
            .attr("class", "card card-body")
            .append("div")
            .attr("class", "col small-text")

        add_simple_field(entry, "Originally found at", inforow)
        inforow.append("br")
        add_download_field(entry, inforow);
        inforow.append("br")
        add_simple_field(entry, "Note", inforow)
        // inforow.append("br")
        // add_simple_field(entry, "Number of Files", inforow)
        inforow.append("br")
        add_simple_field(entry, "Size", inforow)
        inforow.append("br")
        add_simple_field(entry, "Origin Notes", inforow)
        inforow.append("br")
        inforow.append("div").html("<b>Origin paper: </b>")
        for (let e of entry["Origin paper plaintext"].split(",")){
            e = e.trim();
            if (e == "") continue;
            let origindoi = (paper_data.find(a => a.Name == e) || {}).DOI
            let cited_paper = origin_paper_data.find(o => o.Name == e)
            let cite_index = origin_paper_data.indexOf(cited_paper)
            // if (origindoi != undefined && origindoi != ""){
                inforow.append("div").attr("class", "row").html('<div class="col-4">[link]</div><div class="col-8">' + e + '</div>')
            // } else inforow.append("div").html(e)
        }

        inforow.append("br")
        inforow.append("div").html("<b>Usage examples: </b>")

        for (let i in entry["Related to Literature - Algorithm (Dataset tag relations) 1"].split(",")){
            let e = entry["Related to Literature - Algorithm (Dataset tag relations) 1"].split(",")[i].split("(")[0].trim()
            let entryrow = inforow.append("div").attr("class", "row")

            if (e != "") {
                let doi = (paper_data.find(a => a.Name == e) || {}).DOI
                let citation_name = (paper_data.find(a => a.Name == e) || {})["Citation name"]
                let link = "";
                // if (doi != undefined && doi != "") link = '<a href="' + doify(doi) + '">[link]</a>'
                if (doi != undefined && doi != "" && citation_name != undefined) {
                  // link += '<span class="citation" data-cites="' + citation_name + '">'
                  // link += '<a href="#ref-' + citation_name + '" role="doc-biblioref" aria-expanded="false">[link]</a>'
                  // link += '</span>'
                  link += "[@" + citation_name + "]"
                } else link = ""

                entryrow.append("div")
                    .attr("class", "col-4")
                    .html(link)

                entryrow.append("div")
                    .attr("class", "col-4")
                    .html(e)

                let tagrow = entryrow.append("div").attr("class", "col-4")

                if (paper_data.find(a => a.Name == e)){
                    let feature_collection = (paper_data.find(a => a.Name == e) || {})["Graph feature"].split(",")
                    
                    for (let graph_feature of feature_collection){
                        graph_feature = graph_feature.trim().toLowerCase()
                        tagrow.append("div")
                            .attr("class", "rounded-pill badge")
                            .style("margin", "2px")
                            .style("background-color", graph_feature_tags_colors[graph_feature_tags.indexOf(graph_feature)%graph_feature_tags_colors.length])
                            .text(graph_feature)
                    }
                }
            }
        }

        inforow.append("br")

        // DRAW REST OF THE PAGE: uncomment when moving over
  
        let otherinfo = ""
        try{
            let otherinfo = await fetch("../data/Benchmark datasets 64e0439269f9497799025562a4087ce1/" + entry["Name"].replace(".", "") + " " + entry["Page id"] + ".md")
               
            otherinfo = await otherinfo.text() 
            
            var converter = new showdown.Converter();
            
            otherinfo = getTextAfterBody(otherinfo);
            // let otherinfo2 = otherinfo.replace(/\!\[(.*?)\]\((.*?)\)/g, "![$1](data/Benchmark datasets 64e0439269f9497799025562a4087ce1/$2)");
            // console.log(otherinfo2);

            let string_to_print = ""
            
            for (let line of otherinfo.split("\n")){
                if (line == ">" || line == "> ") continue;
                else if (line[0] == "!") {
                    // get everything after the first (, concat the rest
                    let img = line.split("(")
                    // concat all the entries after the first
                    for (let i = 2; i < img.length; i++){
                        img[1] += "(" + img[i]
                    }
                    // remove the last )
                    img[1] = img[1].substring(0, img[1].length - 1)
                    img = img[1]

                    // inforow.append("div")
                    //     .style("text-align", "center")
                    //     .append("img")
                    //     .attr("src", "data/Benchmark datasets 64e0439269f9497799025562a4087ce1/" + img)
                    //     .attr("width", "80%")

                    string_to_print += "<div style='text-align: center'><img src='../data/Benchmark datasets 64e0439269f9497799025562a4087ce1/" + img + "' width='80%'></div>\n"
                // } else if (line.includes("STOP RENDERING")){
                //      break;
                } else string_to_print += line + "\n"
                
            }

            console.log(string_to_print)

        } catch (e){
            console.log(e)
        }

        console.log(entry, inforow.node().innerHTML.replaceAll("<br>", "<br>\n"))
}
