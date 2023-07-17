import Dashboard from './dashboard/dashboard';
import Heading from '../../heading/heading';
export default function Market(searchvalue){
    return(
        <>
        <Heading name={"Market"} />
        <Dashboard searchvalue={searchvalue}/>
        </>
    );
}