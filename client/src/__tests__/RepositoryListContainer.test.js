import { RepositoryListContainer } from "../components/RepositoryList"
import { render } from "@testing-library/react-native"

describe("RepositoryListContainer", () => {
  const repositories = {
    edges: [
      {
        node: {
          id: "jaredpalmer.formik",
          ownerName: "jaredpalmer",
          name: "formik",
          reviewCount: 5,
          stargazersCount: 30387,
          watchersCount: 30387,
          forksCount: 2519,
          url: "https://github.com/jaredpalmer/formik",
          ownerAvatarUrl:
            "https://avatars.githubusercontent.com/u/4060187?v=4",
          description: "Build forms in React, without the tears",
          language: "TypeScript",
          ratingAverage: 90,
          fullName: "jaredpalmer/formik",
        },
      },
    ],
  }

  it("renders repositories provided to it", () => {
    const { debug, getByText } = render(
      <RepositoryListContainer repositories={repositories} />
    )

    expect(getByText("jaredpalmer/formik")).toBeDefined()
    expect(getByText("Build forms in React, without the tears")).toBeDefined()
    expect(getByText("TypeScript")).toBeDefined()
    expect(getByText("30.4k")).toBeDefined()
    expect(getByText("2.5k")).toBeDefined()
    expect(getByText("5")).toBeDefined()
    expect(getByText("90")).toBeDefined()
  })
})
