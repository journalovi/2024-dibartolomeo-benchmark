function generate_collapsible_dataset_info(dataset_name, benchmark_datasets) {
  let dataset = benchmark_datasets.find(d => d.Name === dataset_name);
  if (!dataset) return "";

  console.log(dataset);

  document.getElementById(dataset_name + "-content").innerHTML = `
    asassas
  `;
//   let content = document.querySelector(`#${dataset_name} .collapsible-content`);
}