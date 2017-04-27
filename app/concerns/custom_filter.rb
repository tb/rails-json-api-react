# see https://github.com/cerebris/jsonapi-resources/issues/460
module CustomFilter
  def custom_filter(name, opts = {})
    opts[:apply] = ->(records, value, _options) do
      records.public_send(name, value)
    end

    filter name, opts
  end

  def custom_filters(*names)
    names.each { |name| custom_filter(name, names.extract_options!) }
  end
end
