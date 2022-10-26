import { shallowMount } from "@vue/test-utils";

import Indecision from "@/components/Indecision";

describe("Indecision component", () => {
  let wrapper;
  let clgSpy;

  // Mock the fetch API
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          answer: "yes",
          forced: false,
          image: "https://yesno.wtf/assets/yes/2.gif",
        }),
    })
  );

  beforeEach(() => {
    wrapper = shallowMount(Indecision);

    clgSpy = jest.spyOn(console, "log");

    jest.clearAllMocks();
  });

  test("should be match with the snapshot", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("should change the input value and shouldn't shoot anything (console.log)", async () => {
    const getAnswerSpy = jest.spyOn(wrapper.vm, "getAnswer");

    const input = wrapper.find("input");
    await input.setValue("Hello world");

    expect(clgSpy).toHaveBeenCalledTimes(1);
    expect(getAnswerSpy).not.toHaveBeenCalled();
  });

  test("should enter the '?' symbol and execute the fecth request", async () => {
    const getAnswerSpy = jest.spyOn(wrapper.vm, "getAnswer");

    const input = wrapper.find("input");
    await input.setValue("Hello world?");

    expect(clgSpy).toHaveBeenCalledTimes(1);
    expect(getAnswerSpy).toHaveBeenCalled();
  });

  test("should test the getAnswer method", async () => {
    await wrapper.vm.getAnswer();

    const image = wrapper.find("img");

    expect(image.exists()).toBeTruthy();
    expect(wrapper.vm.image).toBe("https://yesno.wtf/assets/yes/2.gif");
    expect(wrapper.vm.answer).toBe("Sí!");
  });

  test("should test the getAnswer method - API fails", async () => {
    fetch.mockImplementationOnce(() => Promise.reject("API is down :("));

    await wrapper.vm.getAnswer();

    const image = wrapper.find("img");

    expect(image.exists()).toBeFalsy();
    expect(wrapper.vm.answer).toBe("Ups, something went wrong!");
  });
});
