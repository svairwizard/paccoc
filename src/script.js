const head = document.createElement('div');
head.innerHTML = `
    <header>
        <a href="index.html"> home </a>
        <a href="bando.html"> bando </a>
        <a href="answers.html"> answrs </a>
        <a href="learn.html"> learn </a>
    </header>
`;
document.body.prepend(head);

const basement = document.createElement('div');
basement.innerHTML = `
    <footer>
        <p class="cent terminal-text"> code 73x4 2510 2819.30 1337 664 | svairwizard</p>
    </footer>
`;
document.body.append(basement);

function downloadFiles() {
    document.getElementById('materials').click();
}
