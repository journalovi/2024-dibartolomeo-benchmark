```diff
! This paper is under review on the experimental track of the Journal of Visualization and Interaction.
Authors: @picorana
OC: Chat Wacharamanotham
AE: Lane Harrison
R1: mjwybrow
R2: eelir
R3: gdrawing-anon-reviewer
```

# GLaDOS: Graph Layout algorithm Datasets for Open Science

This paper is under submission to the the [experimental track](https://www.journalovi.org/submit.html#experimental) at JoVI.

Papers for this track are written in [Quarto](https://quarto.org/) which is an open source publishing format that supports inline code, including languages like R, Python, Julia, and JavaScript (via Observable Notebook).

```diff
!  Only edit .qmd files! The other files are generated from this.
```

See <https://osf.io/j7ucv/> for more details on the related publication and supplemental materials.

## Setup instructions

1. Clone the repo.

   * On Windows, we currently have paths in the data directory that are too long for git to handle. This prevents cloning. To avoid this problem, run `git config --system core.longpaths true` with administrator rights.

2. `CD` to the repo directory.

3. Install `uv` following [their instructions](https://docs.astral.sh/uv/getting-started/installation/).

## Run instructions

Follow the instructions at <https://quarto.org/docs/get-started/hello/>. If you are using the VSCode Quarto extension and WSL, ensure you start VSCode from the repository directory by running `code .` at the WSL terminal.

For example, to preview the website run

```bash
uv run quarto preview --no-browser --no-watch-inputs
```

and to publish it to GitHub pages use

```bash
uv run quarto publish --no-prompt gh-pages
```

While you're editing, it is helpful to periodically delete the `_site` folder and regenerate it to ensure all changes are used and that warnings don't show up:

```bash
rm -rf _site
```
