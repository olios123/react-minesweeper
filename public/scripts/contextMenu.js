// Don't display context menu while right-clicking on tile
window.addEventListener("load", () => {
    document.querySelectorAll(".tile").forEach((tile) => {
        tile.addEventListener("contextmenu", e => e.preventDefault());
    });
});

