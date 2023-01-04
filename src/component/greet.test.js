import { render,screen } from "@testing-library/react"
import Greet from "./greet"

test('render Greet',()=>{
    render(<Greet />);
    let a=screen.getByText('hello');
    expect(a).toBeInTheDocument();
})