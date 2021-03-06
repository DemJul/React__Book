import React from 'react'

class SortMenu extends React.Component {

    constructor(props){
        super(props);
        this.sortRef = React.createRef();
        this.activeLabel = props.items[this.state.activeItem].name;
    }

    state = {
        visibleSort:false,
        activeItem: 0,
    };

     // Обновление состояния
    onSelectedItem = (index) => {
        this.setState({
            activeItem: index,
            visibleSort:false,
        });
    };

    onClickSort = (flagState) => {
        this.setState({
            visibleSort: flagState,
        })
    }

    handleClick = (event) => {
        if(!event.path.includes(this.sortRef.current)) {
            this.onClickSort(false);
        }
    }

    componentDidMount() {
        document.body.addEventListener('click', this.handleClick); 
    }
    
    componentDidUpdate() {
        document.body.addEventListener('click', this.handleClick); 
    }

    render(){
        const {items} = this.props;
        console.log(items[this.state.activeItem])
        return (
            <div 
            ref={this.sortRef}
            className="sort">
                <div className="sort__label">
                    <svg
                        className={this.state.visibleSort ? 'rotated' : ''}
                        width="10"
                        height="6"
                        viewBox="0 0 10 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                    <path
                    d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                    fill="#2C2C2C"
                    />
                    </svg>
                    <b>Сортировка по:</b>
                    <span onClick={() => this.onClickSort(!this.state.visibleSort)}>{items[this.state.activeItem].name}</span>
                    </div>
                    {/* Если this.state.visibleSort true, тогда окно появляется */}
                    {this.state.visibleSort && <div className="sort__popup">
                        <ul>
                        {items && items.map((obj, index) => (
                            <li 
                            onClick={() => this.onSelectedItem(index)}
                            className={this.state.activeItem === index ? 'active' : ''} key={obj.type}>{obj.name}</li>
                        ))}
                        </ul>
                    </div>}
            </div>
        )
    }
    
}

export default SortMenu
