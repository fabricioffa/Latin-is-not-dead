class GridConttroler {

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

    hideOtherRows(grid, itemSelector) {
        this.showFirstRow(grid, itemSelector);

        if (this.countRows(grid) > 1) {
            const gridItems = Array.from(grid.querySelectorAll(itemSelector));
            const colsPerRow = this.countColumns(grid);
            const otherRowsCols = gridItems.slice(colsPerRow);

            for (let col of otherRowsCols) {
                col.style.display = 'none';
            };
        }

        return this;
    }

    showFirstRow(grid, itemSelector) {
        const gridItems = Array.from(grid.querySelectorAll(itemSelector));
        const colsPerRow = this.countColumns(grid);
        const firstRowCols = gridItems.slice(0, colsPerRow);

        for (let col of firstRowCols) {
            col.style.display = 'block';
        };

        return this;
    }

    formatGrids(grids) {
        grids.forEach(grid => {

            if (grid.classList.contains('intro-grid')) return;

            const gridItemClass = grid.querySelector('div').classList[0];

            this.hideOtherRows(grid, `.${gridItemClass}`)
        });

        return this;
    }
    
    slideGrid(grid, direction) {
        const gridItemClass = grid.querySelector('div').classList[0];
        const gridItems = Array.from(grid.querySelectorAll(`.${gridItemClass}`));
        const colsPerRow = this.countColumns(grid);

        let newRowIndex = [];

        gridItems.forEach((item, index) => {
            if (item.style.display === 'block') newRowIndex.push(index);
        });
        newRowIndex = newRowIndex.map(item => item + colsPerRow);
        console.log(newRowIndex);
        
        gridItems.forEach(item => item.style.display = 'none')
        
        if (direction === 'right') {
            for (let num of newRowIndex) {
                
                console.log(gridItems[num]);
                gridItems[num].style.display = 'block'
           }
        }


        console.log("Left indisponícel")

        // Em que linha está:
            // Selecionar os itens com display block
                // fazer um loop, pegar o índice do último (ou primeiro) item com display block
                // Ocultar os itens antes mostrados e exibir os seguintes (ou anteriores)
        // Mostrar a próxima ou anterior
    }
}

const instance = new GridConttroler;
export default instance;