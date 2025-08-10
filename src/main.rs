use yew::prelude::*;


#[function_component]
fn App() -> Html {
    let list = use_state(|| vec!["talk about cookies", "weekend plans", "rustlang"]);

    let videos_html = list.iter().map(|l| html!{
        <li>{format!("{}", l)}</li>
    }).collect::<Html>();

    html! {
        <div>
            <ul>{videos_html}</ul>
            <input type="text"/>
        </div>
    }
}

fn main() {
   yew::Renderer::<App>::new().render();
}
