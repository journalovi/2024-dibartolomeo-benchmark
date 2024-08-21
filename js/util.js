function doify(text){
    if (text == "" || text == undefined) return text;
    if (text.includes("https")) return (text);
    else return ("https://doi.org/" + text);
}

function add_simple_field(entry, field_name, div, name = ""){
    if (entry[field_name] != "" && entry[field_name] != undefined){
        let title = name === "" ? field_name : name;
        div.append("div").html("<b>" + title + ": </b>" + urlify(entry[field_name]))
    }
}

function add_download_field(entry, div){
    let divSection = div.append("div").html("<b>" + "Download formatted data: " + "</b>");
    const list = ['OSF link gexf', 'OSF link gml', 'OSF link graphml', 'OSF link json']

    list.forEach((item)=>{
        if(entry[item] != "" && entry[item] != undefined){
            divSection.append("a")
            // .attr('type', 'button')
            .attr('href', entry[item])
            .attr('class', 'btn btn-secondary btn-sm skinny-button')
            .text(item.split("OSF link").pop().toUpperCase())
        }   
    })
}

function urlify(text) {
    var urlRegex = /(([a-z]+:\/\/)?(([a-z0-9\-]+\.)+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel|local|internal))(:[0-9]{1,5})?(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&amp;]*)?)?(#[a-zA-Z0-9!$&'()*+.=-_~:@/?]*)?)(\s+|$)/gi;
    return text.replace(urlRegex, function(url) {
        return '<a href="' + url + '">' + url + '</a>';
    })
}

function getTextAfterBody(input) {
    const lines = input.split('\n');
    let emptyLineCount = 0;
    let text = '';

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        if (line === '# Body') {
            text = lines.slice(i + 1).join('\n');
            // MathJax.typeset();
        } 
    }
    
    return text;
}