from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/convert', methods=['POST'])
def convert():
    data = request.json
    number = data['number']
    base_from = data.get('baseFrom', 10)  # Default to decimal if not provided
    base_to = data.get('baseTo', 10)  # Default to decimal if not provided

    if base_from == 'float' or base_to == 'float':
        result = float_conversion(number, base_from, base_to)
    else:
        result = convert_number(number, base_from, base_to)
    return jsonify(result=result)

def convert_number(number, base_from, base_to):
    # Convert from base_from to decimal
    if base_from != '10':
        number = int(number, int(base_from))
    else:
        number = int(number)

    # Convert from decimal to base_to
    if base_to == '2':
        return bin(number)[2:]  # remove the '0b' prefix
    elif base_to == '10':
        return str(number)
    elif base_to == '16':
        return hex(number)[2:]  # remove the '0x' prefix
    else:
        return str(number)

def float_conversion(number, base_from, base_to):
    if base_from == 'float':
        if base_to == '2':
            return bin(int(float(number)))[2:]
        elif base_to == '10':
            return str(int(float(number)))
        elif base_to == '16':
            return hex(int(float(number)))[2:]
    else:
        float_number = float.fromhex(number) if base_from == '16' else float(int(number, int(base_from)))
        return str(float_number)

if __name__ == "__main__":
    app.run(debug=True)
