import CatComp from '../components/Category';

const Tag = (props) => (
    <div>
        <CatComp name={props.query.name} />
    </div>
);

export default Tag;