// /*
//     Global variables
//  */
// let flagged: any = [];
// const flag = "<i class=\"fi fi-rr-flag-alt\"></i>";
//
//
// interface ElementClick {
//     target: any,
//     mouseClick: "left" | "right"
// }
// interface TileClick {
//     target: any,
//     mouseClick: "left" | "right",
//     position: {
//         x: number,
//         y: number
//     },
//     index: number
// }
//
// function tileClicked({ target, mouseClick } : ElementClick) {
//     // Reference to tile if clicked on icon
//     if (target.classList[0] != "tile") target = target.parentElement;
//
//     // Position of the tile
//     const position = {
//         x: target.attributes["position-x"],
//         y: target.attributes["position-y"]
//     }
//
//     // Find index of a clicked tile in flagged array
//     // Returning index of a flagged tile (-1 if not flagged)
//     const index = flagged.findIndex((el: any) => el.x == position.x && el.y == position.y);
//
//     switch (mouseClick)
//     {
//         case "left":
//             leftClick({ target, position, index });
//             break;
//         case "right":
//             rightClick({ target, position, index })
//     }
// }
//
// function leftClick({ target, position, index } : TileClick) {
//     console.log(flagged, position)
//
//     // If tile is flagged don't reveal tile
//     if (index != -1) return;
//
//     target.innerHTML = ""
// }
// function rightClick({ target, position, index } : TileClick) {
//     // Already flagged
//     if (index != -1) {
//         target.innerHTML = "";
//
//         // Remove tile as flagged
//         flagged.splice(index, 1);
//         return;
//     }
//
//     // Add flag to tile
//     target.innerHTML = flag;
//     flagged[flagged.length] = position;
// }
//
// export default function Tile({x, y} : TileProps) {
//     return (
//         <div className="tile"
//              position-x={x}
//              position-y={y}
//              onClick={(click) => {
//                  tileClicked({
//                      target: click.target,
//                      mouseClick: "left"
//                  })
//              }}
//              onContextMenu={(click) => {
//                  tileClicked({
//                      target: click.target,
//                      mouseClick: "right"
//                  })
//              }}
//         >
//             {/* There goes bomb or flag */}
//         </div>
//     )
// }


interface TileProps {
    x: number,
    y: number,
    onClick: () => void,
    onContextMenu: () => void
}

export default function Tile({x , y, onClick, onContextMenu} : TileProps) {
    
    return (
        <div className="tile"
             position-x={x}
             position-y={y}
             onClick={onClick} // Left click
             onContextMenu={onContextMenu} // Right click
        >
            {/* There goes bomb or flag */}
        </div>
    )
}