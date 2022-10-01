import { computeFileSize } from "./../src/lib/compute-file-size"

test("Compute file size in bytes", () => {
  const file = { size: 100 }
  expect(computeFileSize(file)).toBe("100 bytes")
  expect(computeFileSize({ size: 348128 })).toBe(
    Math.floor(348128 / 1000) + " KB"
  )
  expect(computeFileSize({ size: 100 * 1000 * 1000 })).toBe("100 MB")
  expect(computeFileSize({ size: 210 * 1000 * 1000 * 1000 })).toBe("210 GB")
  // expect(computeFileSize({ size: 100 * 1000 * 1000 * 1000 * 1000 })).toBe("100 TB");
})
