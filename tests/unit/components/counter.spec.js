import { shallowMount } from "@vue/test-utils";

import Counter from "@/components/Counter";

describe("Counter Component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Counter);
  });

  // test("should be match with the snapshot", () => {
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  test("should have the default value 'Counter'", () => {
    expect(wrapper.find("h2").exists()).toBeTruthy();

    // const h2 = wrapper.find("h2");
    const h2 = wrapper.find("h2").text();

    // expect(h2.text()).toBe("Counter");
    expect(h2).toBe("Counter");
  });

  test("should be 1  the default value in the p", () => {
    // const pTags = wrapper.find("p");
    const pTag = wrapper.find("[data-testid='counter']").text();

    // expect(pTags[1].text()).toBe("1 persona");
    expect(pTag).toBe("1");
  });

  test("should increase and decrease counter", async () => {
    const [decreaseButton, increaseButton] = wrapper.findAll("button");

    await increaseButton.trigger("click");
    await increaseButton.trigger("click");
    await increaseButton.trigger("click");
    await increaseButton.trigger("click");
    await decreaseButton.trigger("click");
    await decreaseButton.trigger("click");

    const pTagValue = wrapper.find("[data-testid='counter']").text();

    expect(pTagValue).toBe("3");
  });

  test("should set the default value", () => {
    // const start = wrapper.props("start");
    const { start } = wrapper.props();

    const value = wrapper.find("[data-testid='counter']").text();

    expect(+value).toBe(start);
  });

  test("should show the prop title", () => {
    const title = "hello world";

    const wrapper = shallowMount(Counter, {
      props: {
        title,
        start: 5,
      },
    });

    const h2 = wrapper.find("h2").text();
    const value = wrapper.find("[data-testid='counter']").text();

    expect(h2).toBe(title);
    expect(+value).toBe(5);
  });
});
