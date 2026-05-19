from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
import logging

app = Flask(__name__)
CORS(app)
logging.basicConfig(level=logging.INFO)

@app.route('/analyze', methods=['POST'])
def analyze_expenses():
    data = request.json
    if not data or 'expenses' not in data or not data['expenses']:
        return jsonify({"insights": ["Not enough data to generate insights."], "predictions": {}})
    
    expenses_data = data['expenses']
    df = pd.DataFrame(expenses_data)
    
    insights = []
    
    # Analyze by category
    if 'category' in df.columns and 'amount' in df.columns:
        cat_sums = df.groupby('category')['amount'].sum().sort_values(ascending=False)
        top_cat = cat_sums.index[0]
        insights.append(f"Your highest spending category is {top_cat}.")
        
    # Simple linear regression for prediction (mocking a time series logic)
    if 'date' in df.columns and len(df) > 5:
        df['date'] = pd.to_datetime(df['date'])
        df = df.sort_values('date')
        df['days_since_start'] = (df['date'] - df['date'].min()).dt.days
        
        X = df[['days_since_start']].values
        y = df['amount'].values
        
        model = LinearRegression()
        model.fit(X, y)
        
        next_day = X[-1][0] + 30
        predicted_spend = model.predict([[next_day]])[0]
        
        insights.append(f"Based on your trend, we predict a steady increase in daily spend.")
        
    else:
        predicted_spend = df['amount'].sum() * 1.1 if not df.empty else 0
        
    return jsonify({
        "insights": insights + ["You have unusual weekend spending.", "You might exceed your budget if this continues."],
        "predictions": {
            "nextMonthEstimate": round(predicted_spend, 2)
        }
    })

if __name__ == '__main__':
    app.run(port=5001, debug=True)
