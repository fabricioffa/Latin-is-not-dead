const menuLinks = document.querySelectorAll('.menu a');
const grids = document.querySelectorAll('.grid');
const gridtal = document.querySelector('.course-grid');


// MENU

// Toogles off the menu when a link is clicked

menuLinks.forEach(link => link.addEventListener('click', e => {
    // scrolling to top??
    let hamburguerToogle = document.querySelector('#hamburguer-toogle');
    hamburguerToogle.checked = false;
}))

// GRIDS

class GridControlers {

    countColumns(grid) {
        const columnsNumber = window.getComputedStyle(grid)
            .getPropertyValue('grid-template-columns')
            .split(' ')
            .length;
        return columnsNumber;
    }

    countRows(grid) {
        const rowsNumber = window.getComputedStyle(grid)
            .getPropertyValue('grid-template-rows')
            .split(' ')
            .length;
        return rowsNumber;
    }

    countItems(grid) {
        const itemsNum = this.countColumns(grid) * this.countRows(grid);
        return itemsNum;
    }

    hideRows(grid, itemSelector) {
        this.showRows(grid, itemSelector);

        if (this.countRows(grid) > 1) {
            const gridItems = Array.from(grid.querySelectorAll(itemSelector));
            const colsPerRow = this.countColumns(grid);
            const otherRowsCols = gridItems.slice(colsPerRow);
            
            for (let col of otherRowsCols) {
                col.style.display = 'none';
            }
        }
    }
    
    showRows(grid, itemSelector) {
        const gridItems = Array.from(grid.querySelectorAll(itemSelector));
        const colsPerRow = this.countColumns(grid);
        const firstRowCols = gridItems.slice(0, colsPerRow);

        for (let col of firstRowCols) {
            col.style.display = 'block';
        }
    }

}

window.addEventListener('resize', () => {
    
    const gridControler = new GridControlers;
    
    
    grids.forEach(grid => {
        
        if (grid.classList.contains('intro-grid')) return;
        
        const gridItemClass = grid.querySelector('div').classList[0];
        gridControler.hideRows(grid, `.${gridItemClass}`);
    });
    
});

